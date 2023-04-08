import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { addItem, getItemsByCategoryAndUserId } from "../db/dal/items.dal";
import HttpStatus, { StatusCodes } from "http-status-codes";
import { Item } from "../db/schemas/item.schema";
import mongoose from "mongoose";
import { validationResult } from "express-validator/check";
import { validateAddItemRequest } from "../validation/items.validation";

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
            categoryId,
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