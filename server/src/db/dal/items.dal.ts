import { Item, ItemModel } from "../schemas/item.schema";
import mongoose, { Require_id } from "mongoose";
import { Category, CategoryModel } from "../schemas/category.schema";

type ItemWithId = Item & Require_id<Item>;
export interface ItemWithCategory extends ItemWithId {
    category: Category
}

export const addItem = async (item: Item): Promise<Item> => ItemModel.create(item);

export const getItemsById = async (itemIds: mongoose.Types.ObjectId[]): Promise<ItemWithCategory[]> => ItemModel
    .aggregate([
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

export const getItemsByCategoryAndUserId = async (categoryId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId): Promise<Item[]> => {
    const query: mongoose.FilterQuery<Item> = {
        categoryId,
        $or: [{userId}, {userId: {$exists: false}}]
    };

    return await ItemModel.find(query).exec();
};