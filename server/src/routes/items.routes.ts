import {authenticate, AuthenticatedRequest} from "../auth/auth-middleware";
import {Request, Response, Router} from "express";
import {addItem, getAllItems, getItemsByCategoryAndUserId} from "../db/dal/items.dal";
import {validationResult} from "express-validator/check";
import HttpStatus, {StatusCodes} from "http-status-codes";
import {addRecord} from "../db/dal/chosen-item-records.dal";
import mongoose from "mongoose";

import {Item} from "../db/schemas/item.schema";
import {validateAddItemRequest, validateRecordRequest} from "../validation/items.validation";import { upsertFeedbacks } from "../services/feedback";
import { getCommonlyUsedItems } from "../services/commonly-used-items";

const router = Router();

router.get('/commonlyUsed', authenticate, async (req: Request, res: Response) => {
    const {userId} = (req as AuthenticatedRequest).token;
    let response: Item[] | string;
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

router.get('/', authenticate, async (req: Request, res: Response) => {
    const {userId} = (req as AuthenticatedRequest).token;
    let response: Item[] | string;
    let statusCode = StatusCodes.OK;

    try {
        response = await getAllItems();
        console.log(`Sending ${response.length} items. userId: ${userId}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get items. userId: ${userId}. Error: ${error}`;
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

    let response: Item | string;
    let statusCode = HttpStatus.OK;
    const {name, imageUrl, categoryId} = req.body;
    const {userId} = (req as AuthenticatedRequest).token;

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

export default router;