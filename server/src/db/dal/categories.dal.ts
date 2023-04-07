import { Category, CategoryModel } from "../schemas/category.schema";
import mongoose from 'mongoose';

export const getAllCategories = async (): Promise<Category[]> => CategoryModel.find();

export const addCategory = async (category: Category): Promise<Category> => CategoryModel.create(category);

export const getCategoriesMap = async (): Promise<Map<string, mongoose.Types.ObjectId>> => {
  try {
    const categories: Category[] = await CategoryModel.find().exec();
    const categoriesMap: Map<string, mongoose.Types.ObjectId> = new Map();
    categories.forEach((category: Category) => {
      categoriesMap.set(category.name, category.id!);
    });
    return categoriesMap;
  } catch (error) {
    console.log(`Failed while fetching categories: ${error}`);
    return new Map();
  }
};

  