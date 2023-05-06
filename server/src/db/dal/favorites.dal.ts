import mongoose from "mongoose";
import { Favorite, FavoriteModel } from "../schemas/favorites.schema";
import { Item, ItemModel } from "../schemas/item.schema";
import { getAllItemsWithS3Images } from "../../services/s3-bucket";

export const getFavoriteItemsByUserId = async (userId: mongoose.Types.ObjectId): Promise<Item[]> => {
    const favoriteItems = await FavoriteModel.findOne({ userId });
    const items = await ItemModel.find({ _id: { $in: favoriteItems?.itemIds || [] } });
    return await getAllItemsWithS3Images(items);
}

export const addFavoriteItem = async (userId: mongoose.Types.ObjectId, itemId: mongoose.Types.ObjectId): Promise<Favorite | null> => {
    return FavoriteModel.findOneAndUpdate(
        { userId },
        { $addToSet: { itemIds: itemId } },
        { upsert: true, new: true }
    );
}

export const removeFavoriteItem = async (userId: mongoose.Types.ObjectId, itemId: mongoose.Types.ObjectId): Promise<Favorite | null> => {
    let updatedFavoriteItems = await FavoriteModel.findOneAndUpdate(
        { userId },
        { $pullAll: { itemIds: [itemId] } },
        { new: true }
    );

    if (!updatedFavoriteItems?.itemIds.length) {
        updatedFavoriteItems = await FavoriteModel.findByIdAndDelete(updatedFavoriteItems?._id);
    }

    return updatedFavoriteItems;
}