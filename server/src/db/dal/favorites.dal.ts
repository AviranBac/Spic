
import mongoose from "mongoose";
import { Favorite, FavoriteModel } from "../schemas/favorites.schema";
import { Item, ItemModel } from "../schemas/item.schema";

interface favoriteItem {
    userId: mongoose.Types.ObjectId,
    itemId: mongoose.Types.ObjectId
} 

export const getFavoriteItemsByUserId = async (userId: mongoose.Types.ObjectId): Promise<Item[]> => {
    const favoriteItems = await FavoriteModel.findOne({ userId });
    return ItemModel.find({ _id: { $in: favoriteItems?.favoriteItemsId || [] } });
}

export const addFavoriteItem = async ({ userId, itemId }: favoriteItem): Promise<Favorite | null> => {
    return FavoriteModel.findOneAndUpdate({ userId }, { $addToSet: { favoriteItemsId: itemId } }, { upsert: true, new: true });
}

export const removeFavoriteItem = async ({ userId, itemId }: favoriteItem): Promise<Favorite | null> => {
    let updatedfavoriteItems = await FavoriteModel.findOneAndUpdate(
        { userId },
        { $pullAll: { favoriteItemsId: [itemId] } },
        { new: true }
    );

    if (!updatedfavoriteItems?.favoriteItemsId.length) {
        updatedfavoriteItems = await FavoriteModel.findByIdAndDelete(updatedfavoriteItems?._id);
    }

    return updatedfavoriteItems;
}