import { authenticate, AuthenticatedRequest } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { addFavoriteItem, getFavoriteItemsByUserId, removeFavoriteItem } from "../db/dal/favorites.dal";
import { validationResult } from "express-validator/check";
import HttpStatus, { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { validateFavoriteItemRequest } from "../validation/favorite.validation";
import { Favorite } from "../db/schemas/favorites.schema";
import { ItemWithCategory } from "../db/dal/items.dal";

const router = Router();

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get favorite items by user ID
 *     description: Get favorite items for the authenticated user.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add or remove favorite item
 *     description: Add or remove a favorite item for the authenticated user.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteItemRequest'
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */

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

export default router;