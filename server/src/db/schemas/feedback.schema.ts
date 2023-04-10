import mongoose from 'mongoose';
import { ItemModel } from "./item.schema";
import { UserModel } from "./user.schema";

const Schema = mongoose.Schema;

export interface Feedback {
    id?: mongoose.Types.ObjectId,
    itemId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    positiveCounter: number,
    negativeCounter: number
}

export const FeedbackSchema = new Schema<Feedback>({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ItemModel.modelName
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    positiveCounter: Number,
    negativeCounter: Number
});

export const FeedbackModel = mongoose.model<Feedback>("Feedback", FeedbackSchema);