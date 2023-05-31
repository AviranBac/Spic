import mongoose from "mongoose";
import { getOrderedCategories } from "../categories.dal";
import { UserPreferences, UserPreferencesModel } from "../../schemas/user-preferences.schema";
import { Category } from "../../schemas/category.schema";
import { getSharedItemIdsPerCategory } from "../items.dal";
import { removeFavoriteItem, updateFavoriteItemId } from "./ordered-favorites.dal";
import { deleteItemFromPerCategoryPreferences, updateItemIdInCategory } from "./ordered-items-per-category.dal";

export const getUserPreferences = async (userId: mongoose.Types.ObjectId) => UserPreferencesModel.findOne({userId}).lean();

export const getInitialPreferences = async (): Promise<Omit<UserPreferences, 'userId'>> => ({
    orderedCategoryIds: (await getOrderedCategories()).map((category: Category) => category.id!),
    orderedItemIdsPerCategory: await getSharedItemIdsPerCategory(),
    orderedFavoriteItemIds: []
});

export const updateItemIdInPreferences = async (userId: mongoose.Types.ObjectId,
                                                categoryId: mongoose.Types.ObjectId,
                                                oldItemId: mongoose.Types.ObjectId,
                                                newItemId: mongoose.Types.ObjectId): Promise<void> => {
    await updateItemIdInCategory(userId, categoryId, oldItemId, newItemId);
    await updateFavoriteItemId(userId, oldItemId, newItemId);
}

export const deleteItemIdFromPreferences = async (userId: mongoose.Types.ObjectId,
                                                  categoryId: mongoose.Types.ObjectId,
                                                  itemId: mongoose.Types.ObjectId): Promise<void> => {
    await deleteItemFromPerCategoryPreferences(userId, categoryId, itemId);
    await removeFavoriteItem(userId, itemId);
}