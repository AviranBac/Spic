import { body } from "express-validator/check";
import { UserModel } from "../db/schemas/user.schema";
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
            }),
        body('email', 'Invalid email')
            .isEmail()
            .custom(async (email: string) => {
                if (await UserModel.exists({email})) {
                    return true;
                }
                throw new Error('email does not exist');
import { CategoryModel } from "../db/schemas/category.schema";

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