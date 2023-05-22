import mongoose from 'mongoose';
import { CategoryModel } from "./category.schema";
import { UserModel } from "./user.schema";
import { ItemModel } from "./item.schema";

const Schema = mongoose.Schema;

export type ItemIdsPerCategory = Record<string, mongoose.Types.ObjectId[]>;

export interface UserPreferences {
    id?: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    orderedCategoryIds: mongoose.Types.ObjectId[],
    orderedItemIdsPerCategory: ItemIdsPerCategory,
    orderedFavoriteItemIds: mongoose.Types.ObjectId[]
}

export const UserPreferencesModelSchema = new Schema<UserPreferences>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    orderedCategoryIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: CategoryModel.modelName
    }],
    orderedItemIdsPerCategory: {
        type: mongoose.Schema.Types.Mixed,
        ref: CategoryModel.modelName,
        of: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: ItemModel.modelName
        }]
    },
    orderedFavoriteItemIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: ItemModel.modelName
    }]
});

export const UserPreferencesModel = mongoose.model<UserPreferences>("user_preferences", UserPreferencesModelSchema);