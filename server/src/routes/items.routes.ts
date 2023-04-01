import { authenticate } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { getAllItems } from "../db/dal/items.dal";
import { validationResult } from "express-validator/check";
import HttpStatus, { StatusCodes } from "http-status-codes";
import { addRecord } from "../db/dal/chosen-item-records.dal";
import mongoose from "mongoose";
import { ChosenItemRecord } from "../db/schemas/chosen-item-record.schema";
import { Item } from "../db/schemas/item.schema";
import { validateRecordRequest } from "../validation/items.validation";

const router = Router();

router.get('/:categoryId/:email', authenticate, async (req: Request, res:Response) => {
    const {categoryId, email} = req.params;

    let response: Item[] | string;
    let statusCode = StatusCodes.OK;

    try {
        // TODO: logic for items in a specific category, including common and user specific items
        response = await getAllItems();
        console.log(`Sending ${response.length} items. categoryId: ${categoryId}, email: ${email}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get items. categoryId: ${categoryId}, email: ${email}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.post('/record', authenticate, validateRecordRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    let response: ChosenItemRecord | string;
    let statusCode = HttpStatus.OK;
    const { itemId, requestTime, email } = req.body;

    try {
        response = await addRecord({
            email,
            itemId: new mongoose.Types.ObjectId(itemId),
            requestTime
        });

        console.log(`Recorded chosen item. itemId: ${itemId}, requestTime: ${requestTime}, email: ${email}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to add chosen item record. itemId: ${itemId}, requestTime: ${requestTime}, email: ${email}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

export default router;