import { Item, ItemModel } from "../schemas/item.schema";
import mongoose from "mongoose";
import { Category, CategoryModel } from "../schemas/category.schema";

export interface ItemWithCategory extends Omit<Item, 'categoryId'> {
    category: Category
}

export const addItem = async (item: Item): Promise<Item> => ItemModel.create(item);

export const getItemsById = async (itemIds: mongoose.Types.ObjectId[]): Promise<ItemWithCategory[]> => ItemModel.aggregate([
    {$match: {_id: {$in: itemIds}}},
    {
        $lookup: {
            from: CategoryModel.collection.name,
            localField: "categoryId",
            foreignField: "_id",
            as: "category"
        }
    },
    {$unwind: "$category"},
    {$project: {categoryId: 0}}
]);

export const getItemsByCategoryAndUserId = async (categoryId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId): Promise<Item[]> => {
    const query: mongoose.FilterQuery<Item> = {
        categoryId,
        $or: [{userId}, {userId: {$exists: false}}]
    };

    return await ItemModel.find(query).exec();
};