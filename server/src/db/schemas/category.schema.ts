import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface Category {
    id?: mongoose.Types.ObjectId
    name: string,
    sentenceBeginning: string,
    imageUrl: string
    items: Array<Item>
}
const CategoryModelSchema = new Schema<Category>({
    name: String,
    imageUrl: String,
    sentenceBeginning: String,
    items: [ItemModelSchema]
});

export const CategoryModel = mongoose.model<Category>("Category", CategoryModelSchema);