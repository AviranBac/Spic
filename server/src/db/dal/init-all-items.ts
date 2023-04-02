import { initItemsForCategoryDb } from "./init-items-for-category";
import { getCategoriesMap } from './categories.dal';
import mongoose from "mongoose";


export const initItemsDb = async () => {
    const categoriesMap: Map<string, mongoose.Types.ObjectId> = await getCategoriesMap();
    await initFoodCategory(categoriesMap);
    await initGamesCategory(categoriesMap);
    await initFeelingsCategory(categoriesMap);
    await initClothesCategory(categoriesMap);
    await initHygieneCategory(categoriesMap);
    await initSportCategory(categoriesMap);
    await initFamilyAndFriendsCategory(categoriesMap);
    await initPlacesCategory(categoriesMap);
    await initStudyCategory(categoriesMap);
    await initWatchingCategory(categoriesMap);
    await initConversationCategory(categoriesMap);
}

const initFoodCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const foodItems = ['פיצה', 'המבורגר', 'קולה', 'בננה', 'גלידה', 'שוקולד', 'מלפפון'];
    const foodCategory: mongoose.Types.ObjectId = categoriesMap.get('אוכל')!;
    await initItemsForCategoryDb(foodItems, foodCategory);
    console.log('Finished initializing all items in DB for food category');
}


const initGamesCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const gamesItems = ['כדורסל', 'כדורגל', 'לגו', 'פאזל', 'מחשב', 'בובות', 'קוביות'];
    const gamesCategory: mongoose.Types.ObjectId = categoriesMap.get('משחקים')!;
    await initItemsForCategoryDb(gamesItems, gamesCategory);
    console.log('Finished initializing all items in DB for games category');
}


const initFeelingsCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const feelingsItems = ['בלבול', 'רעב', 'עייפות', 'עצב', 'כעס', 'שנאה', 'אהבה'];
    const feelingsCategory: mongoose.Types.ObjectId = categoriesMap.get('רגשות')!;
    await initItemsForCategoryDb(feelingsItems, feelingsCategory);
    console.log('Finished initializing all items in DB for feelings category');
}

const initClothesCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const clothesItems = ['חולצה', 'מכנס', 'שמלה', 'חצאית', 'נעליים', 'כובע', 'מעיל'];
    const clothesCategory: mongoose.Types.ObjectId = categoriesMap.get('לבוש')!;
    await initItemsForCategoryDb(clothesItems, clothesCategory);
    console.log('Finished initializing all items in DB for clothes category');
}

const initHygieneCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const hygieneItems = ['לנקות', 'להתקלח', 'לשטוף ידיים', 'לצחצח שיניים', 'שירותים'];
    const hygieneCategory: mongoose.Types.ObjectId = categoriesMap.get('היגיינה')!;
    await initItemsForCategoryDb(hygieneItems, hygieneCategory);
    console.log('Finished initializing all items in DB for hygiene category');
}

const initSportCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const sportItems = ['כדורסל', 'כדורגל', 'ריצה', 'קפיצה', 'התעמלות', 'כדורעף'];
    const sportCategory: mongoose.Types.ObjectId = categoriesMap.get('ספורט')!;
    await initItemsForCategoryDb(sportItems, sportCategory);
    console.log('Finished initializing all items in DB for sport category');
}

const initFamilyAndFriendsCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const familyAndFriendsItems = ['סבתא','סבא', 'אחות', 'אח', 'אבא', 'אמא', 'חברה', 'חבר'];
    const familyAndFriendsCategory: mongoose.Types.ObjectId = categoriesMap.get('משפחה וחברים')!;
    await initItemsForCategoryDb(familyAndFriendsItems, familyAndFriendsCategory);
    console.log('Finished initializing all items in DB for familyAndFriends category');
}

const initPlacesCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const placesItems = ['בית', 'בית ספר', 'יער', 'חוג', 'משחקיה', 'קניון', 'מגרש'];
    const placesCategory: mongoose.Types.ObjectId = categoriesMap.get('מקומות')!;
    await initItemsForCategoryDb(placesItems, placesCategory);
    console.log('Finished initializing all items in DB for places category');
}

const initWatchingCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const watchingItems = ['טלוויזיה', 'סרט', 'סדרה', 'מופע', 'כוכבים'];
    const watchingCategory: mongoose.Types.ObjectId = categoriesMap.get('צפייה')!;
    await initItemsForCategoryDb(watchingItems, watchingCategory);
    console.log('Finished initializing all items in DB for watching category');
}

const initStudyCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const studyItems = ['מחק', 'עיפרון', 'ספר', 'מחברת', 'מורה', 'שיעור', 'הפסקה'];
    const studyCategory: mongoose.Types.ObjectId = categoriesMap.get('לימודים')!;
    await initItemsForCategoryDb(studyItems, studyCategory);
    console.log('Finished initializing all items in DB for study category');
}

const initConversationCategory = async (categoriesMap: Map<string, mongoose.Types.ObjectId>) => {
    const conversationItems = ['שלום', 'מה שלומך?', 'אני', 'אתה', 'רוצה?', 'יודע?', 'איפה?'];
    const conversationCategory: mongoose.Types.ObjectId = categoriesMap.get('שיחה')!;
    await initItemsForCategoryDb(conversationItems, conversationCategory);
    console.log('Finished initializing all items in DB for conversation category');
}