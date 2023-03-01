import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface Item extends mongoose.Document {
    name: string
}

export const ItemModelSchema = new Schema<Item>({
    name: String
});

export const ItemModel = mongoose.model<Item>("Item", ItemModelSchema);