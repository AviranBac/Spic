import mongoose from "mongoose";

import { getItemsById, ItemWithCategory } from "../items.dal";
import { UserPreferencesModel } from "../../schemas/user-preferences.schema";
import { getUserPreferences } from "./user-preferences.dal";

export const getOrderedFavoriteItemIds = async (userId: mongoose.Types.ObjectId) => (await getUserPreferences(userId))?.orderedFavoriteItemIds || [];

export const getFavoriteItemsByUserId = async (userId: mongoose.Types.ObjectId): Promise<ItemWithCategory[]> => {
    const orderedFavoriteItemIds: mongoose.Types.ObjectId[] = await getOrderedFavoriteItemIds(userId);
    return (await getItemsById(orderedFavoriteItemIds, true));
}

export const addFavoriteItem = async (userId: mongoose.Types.ObjectId, itemId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[] | undefined> => {
    return (await UserPreferencesModel.findOneAndUpdate(
        {userId},
        {$addToSet: {orderedFavoriteItemIds: itemId}},
        {new: true}
    ))?.orderedFavoriteItemIds;
}

export const removeFavoriteItem = async (userId: mongoose.Types.ObjectId, itemId: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId[] | undefined> => {
    return (await UserPreferencesModel.findOneAndUpdate(
        {userId},
        {$pullAll: {orderedFavoriteItemIds: [itemId]}},
        {new: true}
    ))?.orderedFavoriteItemIds;
}

export const updateOrderedFavoriteItemIds = async (userId: mongoose.Types.ObjectId, orderedFavoriteItemIds: mongoose.Types.ObjectId[]): Promise<mongoose.Types.ObjectId[] | undefined> => {
    return (await UserPreferencesModel.findOneAndUpdate(
        {userId},
        {$set: {orderedFavoriteItemIds}},
        {upsert: true}
    ))?.orderedFavoriteItemIds;
}