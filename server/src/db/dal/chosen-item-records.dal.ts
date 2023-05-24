import { ChosenItemRecord, ChosenItemRecordModel } from "../schemas/chosen-item-record.schema";
import mongoose from "mongoose";

export const getUserRecords = async (userId: mongoose.Types.ObjectId): Promise<ChosenItemRecord[]> => ChosenItemRecordModel.find({userId});

export const addRecord = async (record: ChosenItemRecord): Promise<ChosenItemRecord> => ChosenItemRecordModel.create(record);

export const replaceItemIdInRecords = async (userId: mongoose.Types.ObjectId,
                                             oldItemId: mongoose.Types.ObjectId,
                                             newItemId: mongoose.Types.ObjectId): Promise<void> => {
    await ChosenItemRecordModel.updateMany(
        {userId, itemId: oldItemId},
        {itemId: newItemId}
    );
}

export const deleteItemIdFromRecords = async (userId: mongoose.Types.ObjectId, itemId: mongoose.Types.ObjectId): Promise<void> => {
    await ChosenItemRecordModel.deleteMany({userId, itemId});
}