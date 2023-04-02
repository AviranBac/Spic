import { Category, CategoryModel } from "../schemas/category.schema";
import mongoose from 'mongoose';

export const getAllCategories = async (): Promise<Category[]> => CategoryModel.find();

export const addCategory = async (category: Category): Promise<Category> => CategoryModel.create(category);

export const getCategoryIdByName = async (name: string): Promise<mongoose.Types.ObjectId | undefined> => {
  try {
    const category: Category | null = await CategoryModel.findOne({ name: name }).exec();
    return category?.id;
  } catch (error) {
    console.log(`Failed while fetching category: ${error}`);
    return undefined;
  }
};

  