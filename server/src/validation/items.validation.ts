import { body } from "express-validator/check";
import { ItemModel } from "../db/schemas/item.schema";
import { CategoryModel } from "../db/schemas/category.schema";

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
            })]
}
export const validateAddItemRequest = () => {
    return [
        body('name', 'Invalid name')
            .isString()
            .notEmpty({ignore_whitespace: true}),
        body('imageUrl', 'Invalid imageUrl')
            .isString()
            .notEmpty({ignore_whitespace: true}),
        body('categoryId', 'Invalid categoryId')
            .isString()
            .custom(async (categoryId: string) => {
                if (await CategoryModel.findById(categoryId)) {
                    return true;
                }
                throw new Error('categoryId does not exist');
            })
    ];
};