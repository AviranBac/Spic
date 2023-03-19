import mongoose from "mongoose";
import {Item, ItemModelSchema} from "./item.schema";

const Schema = mongoose.Schema;

export interface Category extends mongoose.Document {
    name: string,
    imageUrl: string
    items: Array<Item>
}

const CategoryModelSchema = new Schema<Category>({
    name: String,
    imageUrl: String,
    items: [ItemModelSchema]
});

export const CategoryModel = mongoose.model<Category>("Category", CategoryModelSchema);
