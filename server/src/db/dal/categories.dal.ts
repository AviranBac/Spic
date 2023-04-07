import { Category, CategoryModel } from "../schemas/category.schema";

export const getAllCategories = async (): Promise<Category[]> => CategoryModel.find();

export const addCategory = async (category: Category): Promise<Category> => CategoryModel.create(category);
  