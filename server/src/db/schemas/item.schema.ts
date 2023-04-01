import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface Item {
    id?: mongoose.ObjectId,
    name: string,
    imageUrl: string,
    categoryId: mongoose.ObjectId
}

export const ItemModelSchema = new Schema<Item>({
    name: String,
    imageUrl: String,
    categoryId: mongoose.Schema.Types.ObjectId
});

export const ItemModel = mongoose.model<Item>("Item", ItemModelSchema);