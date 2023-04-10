import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { addFavoriteItem, getFavoriteItemsByUserId, removeFavoriteItem } from "../db/dal/favorites.dal";
import { validationResult } from "express-validator/check";
import HttpStatus, { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { Item } from "../db/schemas/item.schema";
import { validateFavoriteItemRequest } from "../validation/favorite.validation";
import { Favorite } from "../db/schemas/favorites.schema";

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
    const { userId } = (req as AuthenticatedRequest).token;
    let response: Item[] | string;
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

    let response: string;
    let statusCode = HttpStatus.OK;
    const { itemId, action } = req.body;
    const { userId } = (req as AuthenticatedRequest).token;

    try {
        const favoriteItem = { itemId: new mongoose.Types.ObjectId(itemId), userId: new mongoose.Types.ObjectId(userId) };
        action === 'ADD' ? await addFavoriteItem(favoriteItem) : await removeFavoriteItem(favoriteItem);

        response = `${action} favorite item. itemId: ${itemId}, userId: ${userId}`;
        console.log(response);
    } catch (error) {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response = `Failed while trying to ${action} chosen favorite item record. itemId: ${itemId}, userId: ${userId}. Error: ${error}`;
        console.log(response);
    }

    res.status(statusCode).send(response);
});

export default router;