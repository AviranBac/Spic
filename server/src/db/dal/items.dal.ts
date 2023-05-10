import { Item, ItemModel } from "../schemas/item.schema";
import { getAllItemsWithS3Images } from "../../services/s3-bucket";

import mongoose, { Require_id } from "mongoose";
import { Category, CategoryModel } from "../schemas/category.schema";

type ItemWithId = Item & Require_id<Item>;
export interface ItemWithCategory extends ItemWithId {
    category: Category
}

export const addItem = async (item: Item): Promise<Item> => ItemModel.create(item);

export const getItemsById = async (itemIds: mongoose.Types.ObjectId[]): Promise<ItemWithCategory[]> => {
    const items : ItemWithCategory[] = await ItemModel.aggregate([
        {$match: {_id: {$in: itemIds}}},
        {
            $lookup: {
                from: CategoryModel.collection.name,
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {$unwind: "$category"}
    ]);
    return (await getAllItemsWithS3Images(items) as ItemWithCategory[]);
}
export const getItemsByCategoryAndUserId = async (categoryId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId): Promise<Item[]> => {
    const query: mongoose.FilterQuery<Item> = {
        categoryId,
        $or: [{userId}, {userId: {$exists: false}}]
    };

    const items : Item[] = await ItemModel.find(query).exec();
  return await getAllItemsWithS3Images(items);
};