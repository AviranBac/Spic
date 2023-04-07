import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { getItemsByCategoryAndUserId } from "../db/dal/items.dal";
import { validationResult } from "express-validator/check";
import HttpStatus, { StatusCodes } from "http-status-codes";
import { addRecord } from "../db/dal/chosen-item-records.dal";
import mongoose from "mongoose";
import { ChosenItemRecord } from "../db/schemas/chosen-item-record.schema";
import { Item } from "../db/schemas/item.schema";
import { validateRecordRequest } from "../validation/items.validation";

const router = Router();

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

    let response: ChosenItemRecord | string;
    let statusCode = HttpStatus.OK;
    const {itemId, requestTime} = req.body;
    const {userId} = (req as AuthenticatedRequest).token;

    try {
        response = await addRecord({
            itemId: new mongoose.Types.ObjectId(itemId),
            userId: new mongoose.Types.ObjectId(userId),
            requestTime
        });

        console.log(`Recorded chosen item. itemId: ${itemId}, userId: ${userId}, requestTime: ${requestTime}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to add chosen item record. itemId: ${itemId}, userId: ${userId}, requestTime: ${requestTime}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

export default router;