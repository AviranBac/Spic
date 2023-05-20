import mongoose from "mongoose";
import { UserPreferencesModel } from "../../schemas/user-preferences.schema";
import { getUserPreferences } from "./user-preferences.dal";

export const getOrderedCategoryIds = async (userId: mongoose.Types.ObjectId) => (await getUserPreferences(userId))?.orderedCategoryIds || [];

export const updateOrderedCategoryIds = async (userId: mongoose.Types.ObjectId, orderedCategoryIds: mongoose.Types.ObjectId[]): Promise<mongoose.Types.ObjectId[] | undefined> => {
    return (await UserPreferencesModel.findOneAndUpdate(
        {userId},
        {$set: {orderedCategoryIds}},
        {upsert: true}
    ))?.orderedCategoryIds;
}