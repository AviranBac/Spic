import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface Item{
    id?: mongoose.ObjectId,
    name: string,
    imageUrl: string
}

export const ItemModelSchema = new Schema<Item>({
    name: String,
    imageUrl: String
});

export const ItemModel = mongoose.model<Item>("Item", ItemModelSchema);