import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { addItem, getItemsByCategoryAndUserId, ItemWithCategory, deleteItemById, editItemById } from "../db/dal/items.dal";
import { validationResult } from "express-validator/check";
import HttpStatus, { StatusCodes } from "http-status-codes";
import { addRecord } from "../db/dal/chosen-item-records.dal";
import mongoose from "mongoose";

import { Item } from "../db/schemas/item.schema";
import { validateAddItemRequest, validateRecordRequest, validateEditItemRequest, validateDeleteItemRequest } from "../validation/items.validation";
import { upsertFeedbacks } from "../services/feedback";
import { getCommonlyUsedItems } from "../services/commonly-used-items";

const router = Router();

/**
 * @swagger
 * /items/commonlyUsed:
 *   get:
 *     summary: Get commonly used items
 *     description: Retrieves a list of commonly used items for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemWithCategory'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/commonlyUsed', authenticate, async (req: Request, res: Response) => {
    const { userId } = (req as AuthenticatedRequest).token;
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
 *     description: Retrieves a list of items based on the provided category ID for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/:categoryId/', authenticate, async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const { userId } = (req as AuthenticatedRequest).token;
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
 *     summary: Record chosen item
 *     description: Records a chosen item and updates the feedback for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: The ID of the chosen item.
 *               requestTime:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp when the item was chosen.
 *               recommendedItemIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of recommended items, if any.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ValidationError'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.post('/record', authenticate, validateRecordRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    let response: string = "";
    let statusCode = HttpStatus.OK;
    const {
        itemId,
        requestTime,
        recommendedItemIds
    }: { itemId: string, requestTime: Date, recommendedItemIds: string[] | undefined } = req.body;
    const { userId }: { userId: string } = (req as AuthenticatedRequest).token;

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
 *     summary: Add a new item
 *     description: Adds a new item for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item.
 *               imageUrl:
 *                 type: string
 *                 description: The URL of the item's image.
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category to which the item belongs.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ValidationError'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.post('/', authenticate, validateAddItemRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    let response: Item | string;
    let statusCode = HttpStatus.OK;
    const { name, imageUrl, categoryId } = req.body;
    const { userId } = (req as AuthenticatedRequest).token;

    try {
        response = await addItem({
            name,
            imageUrl,
            categoryId: new mongoose.Types.ObjectId(categoryId),
            userId: new mongoose.Types.ObjectId(userId)
        });

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
 * /items/{itemId}:
 *   put:
 *     summary: Update an item
 *     description: Updates an item for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ValidationError'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.put('/:itemId', authenticate, validateEditItemRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    let response: Item | string;
    let statusCode = HttpStatus.OK;
    const { itemId } = req.params;
    const { name, imageUrl, categoryId } = req.body;

    try {
        response = await editItemById(new mongoose.Types.ObjectId(itemId), {
            name,
            imageUrl,
            categoryId: new mongoose.Types.ObjectId(categoryId)
        });

        console.log(`Updated item with itemId ${itemId}. Updated item: ${JSON.stringify(response)}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to update item with itemId ${itemId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

/**
 * @swagger
 * /items/{itemId}:
 *   delete:
 *     summary: Delete an item
 *     description: Deletes an item for the authenticated user.
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to delete.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ValidationError'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.delete('/:itemId', authenticate, validateDeleteItemRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    let response: string;
    let statusCode = HttpStatus.OK;
    const { itemId } = req.params;

    try {
        await deleteItemById(new mongoose.Types.ObjectId(itemId));
        response = `Deleted item with itemId ${itemId}`;
        console.log(response);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to delete item with itemId ${itemId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

export default router;
