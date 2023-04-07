import { ChosenItemRecord, ChosenItemRecordModel } from "../schemas/chosen-item-record.schema";
import mongoose from "mongoose";

export const getUserRecords = async (userId: mongoose.Types.ObjectId): Promise<ChosenItemRecord[]> => ChosenItemRecordModel.find({userId});

export const addRecord = async (record: ChosenItemRecord): Promise<ChosenItemRecord> => ChosenItemRecordModel.create(record);