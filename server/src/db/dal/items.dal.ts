import { Item, ItemModel } from "../schemas/item.schema";
import mongoose from "mongoose";

export const getAllItems = async (): Promise<Item[]> => ItemModel.find();

export const addItem = async (item: Item): Promise<Item> => ItemModel.create(item);

export const getItemsByCategoryId = async (categoryId: string): Promise<Item[]> => {
    const items = await ItemModel.find({ categoryId });
    return items;
  };

  export const getAllItemsByUserId = async (userId: mongoose.Types.ObjectId): Promise<Item[]> => {
    return await ItemModel.find({ userId }).populate('categoryId').exec();
  };
  