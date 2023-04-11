import { body } from "express-validator/check";
import { ItemModel } from "../db/schemas/item.schema";

export const validateFavoriteItemRequest = () => {
    return [
        body('action', 'Invalid action')
            .isIn(['ADD', 'REMOVE']),
        body('itemId', 'Invalid itemId')
            .isString()
            .custom(async (itemId: string) => {
                if (await ItemModel.findById(itemId)) {
                    return true;
                }
                throw new Error('itemId does not exist');
            }),
    ];
};