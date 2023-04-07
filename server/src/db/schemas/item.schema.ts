import mongoose from 'mongoose';
import { CategoryModel } from "./category.schema";
import { UserModel } from "./user.schema";

const Schema = mongoose.Schema;

export interface Item {
    id?: mongoose.Types.ObjectId,
    name: string,
    imageUrl: string,
    categoryId: mongoose.Types.ObjectId,
    userId?: mongoose.Types.ObjectId
}

export const ItemModelSchema = new Schema<Item>({
    name: String,
    imageUrl: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CategoryModel.modelName
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel.modelName,
        optional: true
    },
});

export const ItemModel = mongoose.model<Item>("Item", ItemModelSchema);