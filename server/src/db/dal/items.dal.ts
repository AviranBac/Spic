import { Item, ItemModel } from "../schemas/item.schema";
import { getAllItemsWithS3Images } from "../../services/s3-bucket";

import mongoose, { Require_id } from "mongoose";
import { Category, CategoryModel } from "../schemas/category.schema";
import { ItemIdsPerCategory } from "../schemas/user-preferences.schema";
import { getAllCategoryIds } from "./categories.dal";
import { getOrderedItemIdsByCategoryId } from "./user-preferences/ordered-items-per-category.dal";
import { deleteItemIdFromPreferences, replaceItemIdInPreferences } from "./user-preferences/user-preferences.dal";
import { deleteItemIdFromRecords, replaceItemIdInRecords } from "./chosen-item-records.dal";
import { deleteItemIdFromFeedbacks, replaceItemIdInFeedbacks } from "./feedbacks.dal";

export type ItemWithId = Item & Require_id<Item>;

export interface ItemWithCategory extends ItemWithId {
    category: Category
}

export const addItem = async (item: Item): Promise<ItemWithId> => ItemModel.create(item);

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

export const deleteItemById = async (userId: mongoose.Types.ObjectId, itemId: mongoose.Types.ObjectId): Promise<void> => {
    const itemToDelete = (await ItemModel.findById(itemId).lean())!;

    if (itemToDelete.userId) {
        await ItemModel.deleteOne({_id: itemId});
    }

    await deleteItemIdFromReferences(userId, itemToDelete.categoryId, itemId);
}

export const editItemById = async (userId: mongoose.Types.ObjectId, itemId: mongoose.Types.ObjectId, updatedItem: ItemWithId): Promise<ItemWithId> => {
    const currentItem: ItemWithId = await ItemModel.findById(itemId).lean();

    if (currentItem?.userId) {
        return (await ItemModel.findOneAndUpdate({_id: itemId}, updatedItem, {new: true}).exec()) as ItemWithId;
    }

    const {_id, ...newItemWithoutId} = updatedItem;
    const newItem: ItemWithId = await addItem({...newItemWithoutId, userId});
    await replaceItemIdInReferences(userId, newItem.categoryId, itemId, new mongoose.Types.ObjectId(newItem.id!));

    return newItem;
}

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

const replaceItemIdInReferences = async (userId: mongoose.Types.ObjectId,
                                                categoryId: mongoose.Types.ObjectId,
                                                oldItemId: mongoose.Types.ObjectId,
                                                newItemId: mongoose.Types.ObjectId): Promise<void> => {
    await replaceItemIdInPreferences(userId, categoryId, oldItemId, newItemId);
    await replaceItemIdInRecords(userId, oldItemId, newItemId);
    await replaceItemIdInFeedbacks(userId, oldItemId, newItemId);
}

const deleteItemIdFromReferences =  async (userId: mongoose.Types.ObjectId,
                                                  categoryId: mongoose.Types.ObjectId,
                                                  itemId: mongoose.Types.ObjectId): Promise<void> => {
    await deleteItemIdFromPreferences(userId, categoryId, itemId);
    await deleteItemIdFromRecords(userId, itemId);
    await deleteItemIdFromFeedbacks(userId, itemId);
}