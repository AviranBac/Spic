import { Item, ItemModel } from "../schemas/item.schema";
import { getAllItemsWithS3Images } from "../../services/s3-bucket";

import mongoose, { Require_id } from "mongoose";
import { Category, CategoryModel } from "../schemas/category.schema";

type ItemWithId = Item & Require_id<Item>;
export interface ItemWithCategory extends ItemWithId {
    category: Category
}

export const addItem = async (item: Item): Promise<Item> => ItemModel.create(item);

export const getItemsById = async (itemIds: mongoose.Types.ObjectId[], ordered = false): Promise<ItemWithCategory[]> => {
    const itemsDictionary: { [itemId: string]: ItemWithCategory } = (await ItemModel.aggregate([
        {$match: {_id: {$in: itemIds}}},
        {
            $lookup: {
                from: CategoryModel.collection.name,
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {$unwind: "$category"}
    ])).reduce((acc, curr) => ({...acc, [curr._id.toString()]: curr}), {});

    const orderedItems: ItemWithCategory[] = ordered ?
        itemIds.map(id => itemsDictionary[id.toString()]) :
        Object.values(itemsDictionary);

    return (await getAllItemsWithS3Images(orderedItems) as ItemWithCategory[]);
};

// TODO: apply order
export const getItemsByCategoryAndUserId = async (categoryId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId): Promise<Item[]> => {
    const query: mongoose.FilterQuery<Item> = {
        categoryId,
        $or: [{userId}, {userId: {$exists: false}}]
    };

    const items : Item[] = await ItemModel.find(query).exec();
  return await getAllItemsWithS3Images(items);
};