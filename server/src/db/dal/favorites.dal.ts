import mongoose from "mongoose";
import { Favorite, FavoriteModel } from "../schemas/favorites.schema";

import { getItemsById, ItemWithCategory } from "./items.dal";

export const getFavoriteItemsByUserId = async (userId: mongoose.Types.ObjectId): Promise<ItemWithCategory[]> => {
    const favoriteItems = await FavoriteModel.findOne({userId});
    return (await getItemsById(favoriteItems?.orderedItemIds || [], true));
}

export const addFavoriteItem = async (userId: mongoose.Types.ObjectId, itemId: mongoose.Types.ObjectId): Promise<Favorite | null> => {
    return FavoriteModel.findOneAndUpdate(
        {userId},
        {$addToSet: {orderedItemIds: itemId}},
        {upsert: true, new: true}
    );
}

export const removeFavoriteItem = async (userId: mongoose.Types.ObjectId, itemId: mongoose.Types.ObjectId): Promise<Favorite | null> => {
    let updatedFavoriteItems = await FavoriteModel.findOneAndUpdate(
        {userId},
        {$pullAll: {orderedItemIds: [itemId]}},
        {new: true}
    );

    if (!updatedFavoriteItems?.orderedItemIds.length) {
        updatedFavoriteItems = await FavoriteModel.findByIdAndDelete(updatedFavoriteItems?._id);
    }

    return updatedFavoriteItems;
}

export const updateOrderedItemIds = async (userId: mongoose.Types.ObjectId, orderedItemIds: mongoose.Types.ObjectId[]): Promise<Favorite | null> => {
    return FavoriteModel.findOneAndUpdate(
        {userId},
        {$set: {orderedItemIds}},
        {upsert: true}
    );
}