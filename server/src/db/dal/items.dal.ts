import { Item, ItemModel } from "../schemas/item.schema";

export const getAllItems = async (): Promise<Item[]> => ItemModel.find();

export const addItem = async (item: Item): Promise<Item> => ItemModel.create(item);

export const getItemsByCategoryId = async (categoryId: string): Promise<Item[]> => {
    const items = await ItemModel.find({ categoryId });
    return items;
  };