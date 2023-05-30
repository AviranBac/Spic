import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import {
    addItem,
    deleteItemById,
    editItemById,
    getItemsByCategoryAndUserId,
    ItemWithCategory,
    ItemWithId
} from "../db/dal/items.dal";
import { validationResult } from "express-validator/check";
import HttpStatus, { StatusCodes } from "http-status-codes";
import { addRecord } from "../db/dal/chosen-item-records.dal";
import mongoose from "mongoose";
import { Item } from "../db/schemas/item.schema";
import {
    validateAddItemRequest,
    validateDeleteItemRequest,
    validateEditItemRequest,
    validateItemOrderRequest,
    validateRecordRequest
} from "../validation/items.validation";
import { upsertFeedbacks } from "../services/feedback";
import { getCommonlyUsedItems } from "../services/commonly-used-items";
import {
    addItemToPerCategoryPreferences,
    updateOrderedItemIdsByCategoryId
} from "../db/dal/user-preferences/ordered-items-per-category.dal";

const router = Router();

/**
 * @swagger
 * /items/commonlyUsed:
 *   get:
 *     summary: Get commonly used items
 *     description: Get the commonly used items for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.get('/commonlyUsed', authenticate, async (req: Request, res: Response) => {
    const {userId} = (req as AuthenticatedRequest).token;
    let response: ItemWithCategory[] | string;
    let statusCode = StatusCodes.OK;

    try {
        response = await getCommonlyUsedItems(new mongoose.Types.ObjectId(userId), new Date());
        console.log(`Sending ${response.length} commonly used items. userId: ${userId}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get commonly used items. userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

/**
 * @swagger
 * /items/{categoryId}:
 *   get:
 *     summary: Get items by category ID
 *     description: Get the items belonging to a specific category for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.get('/:categoryId/', authenticate, async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const {userId} = (req as AuthenticatedRequest).token;
    let response: Item[] | string;
    let statusCode = StatusCodes.OK;

    try {
        response = await getItemsByCategoryAndUserId(new mongoose.Types.ObjectId(categoryId), new mongoose.Types.ObjectId(userId));
        console.log(`Sending ${response.length} items. categoryId: ${categoryId}, userId: ${userId}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get items. categoryId: ${categoryId}, userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

/**
 * @swagger
 * /items/record:
 *   post:
 *     summary: Add item record
 *     description: Add a new item record and optionally update feedbacks.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemRecordRequest'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post('/record', authenticate, validateRecordRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()});
        return;
    }

    let response: string = "";
    let statusCode = HttpStatus.OK;
    const {
        itemId,
        requestTime,
        recommendedItemIds
    }: { itemId: string, requestTime: Date, recommendedItemIds: string[] | undefined } = req.body;
    const {userId}: { userId: string } = (req as AuthenticatedRequest).token;

    try {
        const handleAddRecord: () => Promise<void> = async () => {
            await addRecord({
                itemId: new mongoose.Types.ObjectId(itemId),
                userId: new mongoose.Types.ObjectId(userId),
                requestTime
            });
            console.log(`Recorded chosen item. itemId: ${itemId}, userId: ${userId}, requestTime: ${requestTime}`);
        };

        const handleUpsertFeedbacks: () => Promise<void> = async () => {
            if (recommendedItemIds) {
                await upsertFeedbacks(recommendedItemIds, itemId, new mongoose.Types.ObjectId(userId));
            }
        };

        await Promise.all([handleAddRecord(), handleUpsertFeedbacks()]);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to add chosen item record or update feedbacks. ` +
            `itemId: ${itemId}, userId: ${userId}, requestTime: ${requestTime}` +
            `${recommendedItemIds ?? `, recommendedItemIds: ${recommendedItemIds}`}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Add item
 *     description: Add a new item to a specific category for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddItemRequest'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authenticate, validateAddItemRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()});
        return;
    }

    let response: ItemWithId | string;
    let statusCode = HttpStatus.OK;
    const {name, imageUrl} = req.body;
    const categoryId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.body.categoryId);
    const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId((req as AuthenticatedRequest).token.userId);

    try {
        response = await addItem({name, imageUrl, categoryId, userId});
        await addItemToPerCategoryPreferences(userId, categoryId, response._id);

        console.log(`Added new item for userId ${userId}. Item: ${JSON.stringify(response)}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to add new item. Name: ${name}, imageUrl: ${imageUrl}, categoryId: ${categoryId}, userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

/**
 * @swagger
 * /items:
 *   put:
 *     summary: Edit item
 *     description: Edit an existing item for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditItemRequest'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.put('/', authenticate, validateEditItemRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()});
        return;
    }

    const userId = new mongoose.Types.ObjectId((req as AuthenticatedRequest).token.userId);
    const updatedItem: ItemWithId = req.body;
    const itemId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(updatedItem._id);
    let response: Item | string;
    let statusCode = StatusCodes.OK;

    try {
        response = await editItemById(userId, itemId, updatedItem);
        console.log(`Updated item with itemId: ${itemId.toString()}, userId: ${userId}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to update item. itemId: ${itemId.toString()}, userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

/**
 * @swagger
 * /items/order:
 *   put:
 *     summary: Update item order
 *     description: Update the order of items within a category for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemOrderRequest'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.put('/order', authenticate, validateItemOrderRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()});
        return;
    }

    const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId((req as AuthenticatedRequest).token.userId);
    const categoryId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.body.categoryId);
    const orderedItemIds: mongoose.Types.ObjectId[] = req.body.orderedItemIds
        .map((id: string) => new mongoose.Types.ObjectId(id));
    let response: Item[] | string;
    let statusCode = StatusCodes.OK;

    try {
        await updateOrderedItemIdsByCategoryId(userId, categoryId, orderedItemIds);
        response = await getItemsByCategoryAndUserId(categoryId, userId);
        console.log(`Ordered items in category. userId: ${userId}, categoryId: ${categoryId}, new order: ${orderedItemIds}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to order items in category. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

/**
 * @swagger
 * /items:
 *   delete:
 *     summary: Delete item
 *     description: Delete an existing item for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteItemRequest'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.delete('/', authenticate, validateDeleteItemRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()});
        return;
    }

    const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId((req as AuthenticatedRequest).token.userId);
    const itemId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.body._id);
    let response: string = '';
    let statusCode = StatusCodes.OK;

    try {
        await deleteItemById(userId, itemId);
        console.log(`Deleted item with itemId: ${itemId}, userId: ${userId}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to delete item. itemId: ${itemId}, userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

export default router;