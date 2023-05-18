import { Category, CategoryModel } from "../schemas/category.schema";
import mongoose from "mongoose";
import { getOrderedCategoryIds } from "./user-preferences/ordered-categories.dal";

export const getAllCategoryIds = async (): Promise<mongoose.Types.ObjectId[]> => (await CategoryModel.find())
    .map((category: Category) => category.id!);

export const getOrderedCategories = async (userId?: mongoose.Types.ObjectId): Promise<Category[]> => {
    const categoriesDictionary: { [categoryId: string]: Category } = (await CategoryModel.find())
        .reduce((acc, curr) => ({...acc, [curr._id.toString()]: curr}), {});

    if (!userId) {
        return Object.values(categoriesDictionary);
    }

    const orderedCategoryIds: mongoose.Types.ObjectId[] = await getOrderedCategoryIds(userId);
    return orderedCategoryIds.map((categoryId: mongoose.Types.ObjectId) => categoriesDictionary[categoryId.toString()]);
}

export const addCategory = async (category: Category): Promise<Category> => CategoryModel.create(category);
  