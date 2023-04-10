import { body } from "express-validator/check";
import { ItemModel } from "../db/schemas/item.schema";
import { CategoryModel } from "../db/schemas/category.schema";
import mongoose from "mongoose";
import { difference } from 'lodash';
import { Request } from "express-validator/src/base";

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
        body('recommendedItemIds', 'Invalid recommendedItemIds')
            .custom(async (recommendedItemIds: string[] | undefined, {req}: {req: Request}) => {
               if (recommendedItemIds)  {
                   const {itemId}: {itemId: string} = req.body;

                   if (!recommendedItemIds.find(id => itemId === id)) {
                       throw new Error(`Chosen itemId does not exist in recommended items. itemId: ${itemId}, recommendedItemIds: ${recommendedItemIds}`);
                   }

                   const recommendedItemIdsInDb: string[] = (await ItemModel.find({
                       id: { $in: recommendedItemIds.map(id => new mongoose.Types.ObjectId(id))}
                   }))
                       .map(item => item.id.toString());

                   const idsDifference: string[] = difference(recommendedItemIds, recommendedItemIdsInDb);

                   if (idsDifference.length > 0) {
                       throw new Error(`Some recommendedItemIds were not found in DB: ${idsDifference}`);
                   }
               }

               return true;
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