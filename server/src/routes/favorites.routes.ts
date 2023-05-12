import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import {
    addFavoriteItem,
    getFavoriteItemsByUserId,
    removeFavoriteItem,
    updateOrderedItemIds
} from "../db/dal/favorites.dal";
import { validationResult } from "express-validator/check";
import HttpStatus, { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Mongoose from "mongoose";
import { validateFavoriteItemRequest } from "../validation/favorite.validation";
import { Favorite } from "../db/schemas/favorites.schema";
import { ItemWithCategory } from "../db/dal/items.dal";

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
    const { userId } = (req as AuthenticatedRequest).token;
    let response: ItemWithCategory[] | string;
    let statusCode = StatusCodes.OK;

    try {
        response = await getFavoriteItemsByUserId(new mongoose.Types.ObjectId(userId));
        console.log(`Sending ${response.length} favorite items. userId: ${userId}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get favorite items. userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

router.post('/', authenticate, validateFavoriteItemRequest(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }

    let response: string | Favorite | null;
    let statusCode = HttpStatus.OK;
    const { itemId, action } = req.body;
    const { userId } = (req as AuthenticatedRequest).token;

    try {
        response = action === 'ADD' ?
            await addFavoriteItem(new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(itemId)) :
            await removeFavoriteItem(new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(itemId));

        console.log(`${action} favorite item. itemId: ${itemId}, userId: ${userId}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to ${action} chosen favorite item record. itemId: ${itemId}, userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

// TODO: add validation
router.put('/order', authenticate, async (req: Request, res: Response) => {
    const userId: mongoose.Types.ObjectId = new Mongoose.Types.ObjectId((req as AuthenticatedRequest).token.userId);
    const orderedItemIds: mongoose.Types.ObjectId[] = req.body.orderedItemIds
        .map((id: string) => new mongoose.Types.ObjectId(id));
    let response: ItemWithCategory[] | string;
    let statusCode = StatusCodes.OK;

    try {
        await updateOrderedItemIds(userId, orderedItemIds);
        response = await getFavoriteItemsByUserId(userId);
        console.log(`Ordered favorites. userId: ${userId}, new order: ${orderedItemIds}`);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to get categories. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

export default router;