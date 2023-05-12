import { Category, CategoryModel } from "../schemas/category.schema";
import mongoose from "mongoose";
import { getUserDetails } from "./users.dal";

export const getOrderedCategories = async (userId?: mongoose.Types.ObjectId): Promise<Category[]> => {
    const categoriesDictionary: { [categoryId: string]: Category } = (await CategoryModel.find())
        .reduce((acc, curr) => ({...acc, [curr._id.toString()]: curr}), {});

    if (!userId) {
        return Object.values(categoriesDictionary);
    }

    const orderedCategoryIds = (await getUserDetails(userId))!.orderedCategoryIds!;
    return orderedCategoryIds.map((categoryId: mongoose.Types.ObjectId) => categoriesDictionary[categoryId.toString()]);
}

export const addCategory = async (category: Category): Promise<Category> => CategoryModel.create(category);
  