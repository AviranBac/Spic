import { body } from "express-validator/check";
import { ItemModel } from "../db/schemas/item.schema";

export const validateRecordRequest = () => {
    return [
        body('requestTime', 'Invalid requestTime').isISO8601().toDate(),
        body('itemId', 'Invalid itemId')
            .isString()
            .custom(async (itemId: string) => {
                if (await ItemModel.findById(itemId)) {
                    return true;
                }
                throw new Error('itemId does not exist');
            })
    ];
};