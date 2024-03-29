import mongoose from 'mongoose';
import { ItemModel } from "./item.schema";
import { UserModel } from "./user.schema";

const Schema = mongoose.Schema;

export interface ChosenItemRecord {
    id?: mongoose.Types.ObjectId,
    itemId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    requestTime: Date
}

export const ChosenItemRecordSchema = new Schema<ChosenItemRecord>({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ItemModel.modelName
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    requestTime: Date
});

const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60;
ChosenItemRecordSchema.index({requestTime: 1}, {expireAfterSeconds: THIRTY_DAYS_IN_SECONDS});

export const ChosenItemRecordModel = mongoose.model<ChosenItemRecord>("chosen_item_record", ChosenItemRecordSchema);