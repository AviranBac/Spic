import mongoose from "mongoose";
import { getOrderedCategories } from "../categories.dal";
import { UserPreferences, UserPreferencesModel } from "../../schemas/user-preferences.schema";
import { Category } from "../../schemas/category.schema";
import { getSharedItemIdsPerCategory } from "../items.dal";

export const getUserPreferences = async (userId: mongoose.Types.ObjectId) => UserPreferencesModel.findOne({userId}).lean();

export const getInitialPreferences = async (): Promise<Omit<UserPreferences, 'userId'>> => ({
    orderedCategoryIds: (await getOrderedCategories()).map((category: Category) => category.id!),
    orderedItemIdsPerCategory: await getSharedItemIdsPerCategory(),
    orderedFavoriteItemIds: []
});