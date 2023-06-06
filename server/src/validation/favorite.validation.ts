import { body } from "express-validator";
import { getItemIdsByUserId } from "../db/dal/items.dal";
import { Request } from "express-validator/src/base";
import { AuthenticatedRequest } from "../auth/auth-middleware";
import mongoose from "mongoose";
import { getOrderedFavoriteItemIds } from "../db/dal/user-preferences/ordered-favorites.dal";
import { isEqual, sortBy } from "lodash";

export const validateFavoriteItemRequest = () => {
    return [
        body('action', 'Invalid action')
            .isIn(['ADD', 'REMOVE']),
        body('itemId', 'Invalid itemId')
            .isString()
            .custom(async (itemId: string, {req}: {req: Request}) => {
                const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId((req as AuthenticatedRequest).token.userId);
                if ((await getItemIdsByUserId(userId)).find(currItemId => currItemId.toString() === itemId)) {
                    return true;
                }
                throw new Error(`itemId ${itemId} does not exist for userId: ${userId}`);
            })
    ];
};

export const validateFavoritesOrderRequest = () => {
    return [
        body('orderedFavoriteItemIds', 'Invalid orderedFavoriteItemIds')
            .isArray()
            .custom(async (orderedFavoriteItemIds: string[], {req}: {req: Request}) => {
                const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId((req as AuthenticatedRequest).token.userId);
                const currentlyOrderedFavoriteItemIds: string[] = (await getOrderedFavoriteItemIds(userId)).map(id => id.toString());

                if (isEqual(sortBy(orderedFavoriteItemIds), sortBy(currentlyOrderedFavoriteItemIds))) {
                    return true;
                }

                throw new Error(`orderedFavoriteItemIds does not match currently orderedFavoriteItemIds in DB. Wanted: ${orderedFavoriteItemIds}, currently: ${currentlyOrderedFavoriteItemIds}`);
            })
    ]
}