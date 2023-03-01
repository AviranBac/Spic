import mongoose from "mongoose";
import {Item, ItemModelSchema} from "./item.schema";

const Schema = mongoose.Schema;

export interface Category extends mongoose.Document {
    name: string,
    items: Array<Item>
}

const CategoryModelSchema = new Schema<Category>({
    name: String,
    items: [ItemModelSchema]
});

export const CategoryModel = mongoose.model<Category>("Category", CategoryModelSchema);
