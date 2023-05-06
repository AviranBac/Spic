import { Item, ItemModel } from "../schemas/item.schema";
import mongoose from "mongoose";
import { getAllItemsWithS3Images } from "../../services/s3-bucket";

export const addItem = async (item: Item): Promise<Item> => ItemModel.create(item);

export const getItemsById = async (itemIds: mongoose.Types.ObjectId[]): Promise<Item[]> => {
  const items = await ItemModel.find({ _id: { $in: itemIds } });
  return await getAllItemsWithS3Images(items);
};

export const getItemsByCategoryAndUserId = async (categoryId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) : Promise<Item[]> => {
  const query: mongoose.FilterQuery<Item> = {
    categoryId,
    $or: [{ userId }, { userId: { $exists: false } }]
  };

  const items : Item[] = await ItemModel.find(query).exec();
  return await getAllItemsWithS3Images(items);
};