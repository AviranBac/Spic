import { addItem } from "./items.dal";
import { Item } from "../schemas/item.schema";
import { getPhotos } from "../../services/photos"
import mongoose from 'mongoose';

const getItemsFromUnsplash = async (
    itemsNames: string[],
    categoryId: mongoose.Types.ObjectId
  ): Promise<Item[]> => {
    const items: Item[] = [];
  
    for (const itemName of itemsNames) {
      const photos = await getPhotos(itemName);
  
        const item: Item = {
          name: itemName,
          imageUrl: photos[0],
          categoryId: categoryId,
        };
        items.push(item);
    }

    console.log(items)
  
    return items;
  };

export const initItemsForCategoryDb = async (itemsNames: string[],
                                            categoryId: mongoose.Types.ObjectId) => {
    const items: Item[] = await getItemsFromUnsplash (itemsNames, categoryId);                       
    await Promise.all(
        items.map(async (item) => await addItem(item))
    );
    console.log('Finished initializing items for category in DB');
}