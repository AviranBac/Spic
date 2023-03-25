import {Item, ItemModel} from "../schemas/item.schema";

export const getAllItems = async (): Promise<Item[]> => ItemModel.find();

export const addItem = async (item: Item): Promise<Item> => ItemModel.create(item);
