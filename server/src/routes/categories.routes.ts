import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { getOrderedCategories } from "../db/dal/categories.dal";
import { Category } from "../db/schemas/category.schema";
import HttpStatus, { StatusCodes } from "http-status-codes";
import mongoose, * as Mongoose from "mongoose";
import { updateOrderedCategoryIds } from "../db/dal/user-preferences/ordered-categories.dal";

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
    const {userId} = (req as AuthenticatedRequest).token;
    let response: Category[] | string;
    let statusCode = StatusCodes.OK;

    try {
        response = await getOrderedCategories(new mongoose.Types.ObjectId(userId));
        console.log(`Sending ${response.length} categories`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get categories. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

// TODO: add validation
router.put('/order', authenticate, async (req: Request, res: Response) => {
    const userId: mongoose.Types.ObjectId = new Mongoose.Types.ObjectId((req as AuthenticatedRequest).token.userId);
    const orderedCategoryIds: mongoose.Types.ObjectId[] = req.body.orderedCategoryIds
        .map((id: string) => new mongoose.Types.ObjectId(id));
    let response: Category[] | string;
    let statusCode = StatusCodes.OK;

    try {
        await updateOrderedCategoryIds(userId, orderedCategoryIds);
        response = await getOrderedCategories(userId);
        console.log(`Ordered categories. userId: ${userId}, new order: ${orderedCategoryIds}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to order categories. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

export default router;