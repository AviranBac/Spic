import { Item, ItemModel } from "../schemas/item.schema";
import { getAllItemsWithS3Images } from "../../services/s3-bucket";

import mongoose, { Require_id } from "mongoose";
import { Category, CategoryModel } from "../schemas/category.schema";
import { ItemIdsPerCategory } from "../schemas/user-preferences.schema";
import { getAllCategoryIds } from "./categories.dal";
import { getOrderedItemIdsByCategoryId } from "./user-preferences/ordered-items-per-category.dal";

type ItemWithId = Item & Require_id<Item>;

export interface ItemWithCategory extends ItemWithId {
    category: Category
}

export const addItem = async (item: Item): Promise<Item> => ItemModel.create(item);

export const getItemsById = async (itemIds: mongoose.Types.ObjectId[], ordered = false): Promise<ItemWithCategory[]> => {
    const itemsDictionary: { [itemId: string]: ItemWithCategory } = (await ItemModel.aggregate([
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
    ])).reduce((acc, curr) => ({...acc, [curr._id.toString()]: curr}), {});

    const orderedItems: ItemWithCategory[] = ordered ?
        itemIds.map(id => itemsDictionary[id.toString()]) :
        Object.values(itemsDictionary);

    return (await getAllItemsWithS3Images(orderedItems) as ItemWithCategory[]);
};

export const getItemsByCategoryAndUserId = async (categoryId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId): Promise<Item[]> => {
    const query: mongoose.FilterQuery<Item> = {
        categoryId,
        $or: [{userId}, {userId: {$exists: false}}]
    };

    const itemsDictionary: { [itemId: string]: Item } = (await ItemModel.find(query).exec())
        .reduce((acc, curr) => ({...acc, [curr._id.toString()]: curr}), {});
    const orderedItems: Item[] = (await getOrderedItemIdsByCategoryId(userId, categoryId))
        .map((itemId: mongoose.Types.ObjectId) => itemsDictionary[itemId.toString()]);

    return await getAllItemsWithS3Images(orderedItems);
};

export const getSharedItemIdsPerCategory = async (): Promise<ItemIdsPerCategory> => {
    const query: mongoose.FilterQuery<Item> = {
        $or: [{userId: {$exists: false}}]
    };

    const categoryIds: mongoose.Types.ObjectId[] = await getAllCategoryIds();
    const itemIdsPerCategory: ItemIdsPerCategory = categoryIds.reduce((acc, currCategoryId) => ({
        ...acc,
        [currCategoryId.toString()]: []
    }), {});

    return (await ItemModel.find(query).lean())
        .reduce((acc, currItem) => ({
            ...acc,
            [currItem.categoryId.toString()]: [...acc[currItem.categoryId.toString()], currItem._id]
        }), itemIdsPerCategory);
}

export const getItemIdsByUserId = async (userId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[]> => {
    const query: mongoose.FilterQuery<Item> = {
        $or: [{userId}, {userId: {$exists: false}}]
    };

    return (await ItemModel.find(query).lean()).map(item => item._id);
}