import { ChosenItemRecord, ChosenItemRecordModel } from "../schemas/chosen-item-record.schema";

export const getUserRecords = async (email: string): Promise<ChosenItemRecord[]> => ChosenItemRecordModel.find({email});

export const addRecord = async (record: ChosenItemRecord): Promise<ChosenItemRecord> => ChosenItemRecordModel.create(record);