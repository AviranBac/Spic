import { body } from "express-validator/check";
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