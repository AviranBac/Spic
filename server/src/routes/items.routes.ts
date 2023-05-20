import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import {
    addItem,
    deleteItemById,
    editItemById,
    getItemsByCategoryAndUserId,
    getItemsById,
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
    addItemToPreferences,
    deleteItemFromPreferences,
    updateOrderedItemIdsByCategoryId
} from "../db/dal/user-preferences/ordered-items-per-category.dal";

const router = Router();

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
        await addItemToPreferences(userId, categoryId, response._id);

        console.log(`Added new item for userId ${userId}. Item: ${JSON.stringify(response)}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to add new item. Name: ${name}, imageUrl: ${imageUrl}, categoryId: ${categoryId}, userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.put('/', authenticate, validateEditItemRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({errors: errors.array()});
        return;
    }

    const {userId} = (req as AuthenticatedRequest).token;
    const updatedItem: ItemWithId = req.body;
    const itemId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(updatedItem._id);
    let response: Item | string;
    let statusCode = StatusCodes.OK;

    try {
        response = await editItemById(itemId, updatedItem);
        console.log(`Updated item with itemId: ${itemId.toString()}, userId: ${userId}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to update item. itemId: ${itemId.toString()}, userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

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
        const deletedItemCategoryId: mongoose.Types.ObjectId = (await getItemsById([itemId]))[0].categoryId;

        await deleteItemById(new mongoose.Types.ObjectId(itemId));
        await deleteItemFromPreferences(userId, deletedItemCategoryId, itemId);
        console.log(`Deleted item with itemId: ${itemId}, userId: ${userId}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to delete item. itemId: ${itemId}, userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

export default router;