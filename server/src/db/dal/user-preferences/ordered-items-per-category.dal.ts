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

export const addItemToPreferences = async (userId: mongoose.Types.ObjectId,
                                           categoryId: mongoose.Types.ObjectId,
                                           itemId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[] | undefined> => {
    return (await UserPreferencesModel.findOneAndUpdate(
        {userId},
        {$addToSet: {[getUpdatedKey(categoryId)]: itemId}},
        {new: true}
    ))?.orderedItemIdsPerCategory?.[categoryId.toString()];
}

// TODO: add this to remove item method in Tesel's feature
export const removeItemFromPreferences = async (userId: mongoose.Types.ObjectId,
                                                categoryId: mongoose.Types.ObjectId,
                                                itemId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[] | undefined> => {
    return (await UserPreferencesModel.findOneAndUpdate(
        {userId},
        {$pullAll: {[getUpdatedKey(categoryId)]: [itemId]}},
        {new: true}
    ))?.orderedItemIdsPerCategory?.[categoryId.toString()];
}