
import mongoose from "mongoose";
import { Favorite, FavoriteModel } from "../schemas/favorites.schema";
import { Item, ItemModel } from "../schemas/item.schema";
import { resolve } from "path";

export const getFavoriteItemsByUserId = async (userId: mongoose.Types.ObjectId): Promise<Item[]> => {
    return FavoriteModel.aggregate([
        { $match: { userId } },
        { $group: {
            "_id": "$itemId",
        }},
        {
            $lookup: {
                from: ItemModel.collection.name,
                localField: "_id",
                foreignField: "_id",
                as: "item"
            }
        },
        { $unwind: "$item" },
        { $replaceWith: { $mergeObjects: ["$$ROOT", "$item"] } },
        { $project: { item: 0 } },
    ]);
}

export const addFavoriteItem = async (favoriteItem: Favorite): Promise<Favorite | null>  => {
    return FavoriteModel.findOneAndUpdate(favoriteItem, favoriteItem, {upsert: true });
}

export const removeFavoriteItem = async (favoriteItem: Favorite): Promise<Favorite> => FavoriteModel.remove(favoriteItem);