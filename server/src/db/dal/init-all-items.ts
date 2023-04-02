import { initItemsForCategoryDb } from "./init-items-for-category";
import { getCategoryIdByName } from './categories.dal';
import mongoose from "mongoose";

export const initItemsDb = async () => {
    initFoodCategory();
    initGamesCategory();
}

const initFoodCategory = async () => {
    const foodItems = ['פיצה', 'המבורגר', 'קולה', 'בננה', 'גלידה', 'שוקולד', 'מלפפון'];
    const foodCategory: mongoose.Types.ObjectId = (await getCategoryIdByName('לאכול'))!;
    await initItemsForCategoryDb(foodItems, foodCategory);
    console.log('Finished initializing all items in DB for food category');
}

const initGamesCategory = async () => {
    const foodItems = ['כדורסל', 'כדורגל', 'לגו', 'פאזל', 'מחשב', 'בובות', 'קוביות'];
    const foodCategory: mongoose.Types.ObjectId = (await getCategoryIdByName('לשחק'))!;
    await initItemsForCategoryDb(foodItems, foodCategory);
    console.log('Finished initializing all items in DB for games category');
}