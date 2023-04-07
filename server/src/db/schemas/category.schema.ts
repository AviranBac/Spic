import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface Category {
    id?: mongoose.Types.ObjectId
    name: string,
    imageUrl: string,
    sentenceBeginning: string
}
const CategoryModelSchema = new Schema<Category>({
    name: String,
    imageUrl: String,
    sentenceBeginning: String
});

export const CategoryModel = mongoose.model<Category>("Category", CategoryModelSchema);