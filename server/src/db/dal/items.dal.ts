import { Item, ItemModel } from "../schemas/item.schema";
import mongoose from "mongoose";

export const addItem = async (item: Item): Promise<Item> => ItemModel.create(item);

export const getAllItems = async (): Promise<Item[]> => ItemModel.find();

export const getItemsById = async (itemIds: mongoose.Types.ObjectId[]): Promise<Item[]> => ItemModel.find({_id: {$in: itemIds}});

export const getItemsByCategoryAndUserId = async (categoryId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId): Promise<Item[]> => {
  const query: mongoose.FilterQuery<Item> = {
    categoryId,
    $or: [{ userId }, { userId: { $exists: false } }]
  };

  return await ItemModel.find(query).exec();
};