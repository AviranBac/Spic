import { Category } from "./category";

export interface Item {
    _id: string;
    name: string;
    imageUrl: string;
    categoryId: string;
    userId?: string;
}

export interface ItemWithCategory extends Omit<Item, 'categoryId'> {
    category: Category
}