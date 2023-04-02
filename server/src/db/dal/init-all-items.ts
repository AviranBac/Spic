import { initItemsForCategoryDb } from "./init-items-for-category";
import { getCategoriesMap } from './categories.dal';
import mongoose from "mongoose";


export const initItemsDb = async () => {
    const categoriesMap: Map<string, mongoose.Types.ObjectId> = await getCategoriesMap();
    await initFoodCategory(categoriesMap);
    await initGamesCategory(categoriesMap);
}

const initFoodCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const foodItems = ['פיצה', 'המבורגר', 'קולה', 'בננה', 'גלידה', 'שוקולד', 'מלפפון'];
    const foodCategory: mongoose.Types.ObjectId = categoriesMap.get('לאכול')!;
    await initItemsForCategoryDb(foodItems, foodCategory);
    console.log('Finished initializing all items in DB for food category');
}


const initGamesCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const gamesItems = ['כדורסל', 'כדורגל', 'לגו', 'פאזל', 'מחשב', 'בובות', 'קוביות'];
    const gamesCategory: mongoose.Types.ObjectId = categoriesMap.get('לשחק')!;
    await initItemsForCategoryDb(gamesItems, gamesCategory);
    console.log('Finished initializing all items in DB for games category');
}