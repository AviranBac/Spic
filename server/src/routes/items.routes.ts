import { AuthenticatedRequest, authenticate } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { getItemsByCategoryAndUserId } from "../db/dal/items.dal";
import HttpStatus, { StatusCodes } from "http-status-codes";
import { Item } from "../db/schemas/item.schema";
import mongoose from "mongoose";

const router = Router();

router.get('/:categoryId/', authenticate, async (req: Request, res:Response) => {
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


export default router;