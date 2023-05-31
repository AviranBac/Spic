import mongoose from "mongoose";
import { UserPreferencesModel } from "../../schemas/user-preferences.schema";
import { getUserPreferences } from "./user-preferences.dal";

const getUpdatedKey = (categoryId: mongoose.Types.ObjectId) => `orderedItemIdsPerCategory.${categoryId.toString()}`;

export const getOrderedItemIdsByCategoryId = async (userId: mongoose.Types.ObjectId, categoryId: mongoose.Types.ObjectId) => {
    return (await getUserPreferences(userId))?.orderedItemIdsPerCategory[categoryId.toString()] || [];
}

export const updateOrderedItemIdsByCategoryId = async (userId: mongoose.Types.ObjectId,
                                                       categoryId: mongoose.Types.ObjectId,
                                                       orderedItemIds: mongoose.Types.ObjectId[]): Promise<mongoose.Types.ObjectId[] | undefined> => {
    return (await UserPreferencesModel.findOneAndUpdate(
        {userId},
        {$set: {[getUpdatedKey(categoryId)]: orderedItemIds}},
        {upsert: true}
    ))?.orderedItemIdsPerCategory?.[categoryId.toString()];
}

export const addItemToPerCategoryPreferences = async (userId: mongoose.Types.ObjectId,
                                                      categoryId: mongoose.Types.ObjectId,
                                                      itemId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[] | undefined> => {
    return (await UserPreferencesModel.findOneAndUpdate(
        {userId},
        {$addToSet: {[getUpdatedKey(categoryId)]: itemId}},
        {new: true}
    ))?.orderedItemIdsPerCategory?.[categoryId.toString()];
}

export const deleteItemFromPerCategoryPreferences = async (userId: mongoose.Types.ObjectId,
                                                           categoryId: mongoose.Types.ObjectId,
                                                           itemId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[] | undefined> => {
    return (await UserPreferencesModel.findOneAndUpdate(
        {userId},
        {$pullAll: {[getUpdatedKey(categoryId)]: [itemId]}},
        {new: true}
    ))?.orderedItemIdsPerCategory?.[categoryId.toString()];
}

export const updateItemIdInCategory = async (userId: mongoose.Types.ObjectId,
                                             categoryId: mongoose.Types.ObjectId,
                                             oldItemId: mongoose.Types.ObjectId,
                                             newItemId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[] | undefined> => {
    const updatedOrderedItemIdsByCategoryId: mongoose.Types.ObjectId[] = (await getOrderedItemIdsByCategoryId(userId, categoryId))
        .map((itemId: mongoose.Types.ObjectId) => itemId.toString() === oldItemId.toString() ? newItemId : itemId);

    return updateOrderedItemIdsByCategoryId(userId, categoryId, updatedOrderedItemIdsByCategoryId);
}
