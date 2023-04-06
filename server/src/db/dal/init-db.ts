import { addCategory } from "./categories.dal";
import { Category } from "../schemas/category.schema";

const categories: Category[] = [{
    name: 'להתלבש',
    sentenceBeginning: 'אני רוצה ללבוש',
    imageUrl: 'https://i.ibb.co/bB4TzqW/clothes.jpg',
    items: []
},{
    name: 'רגשות',
    sentenceBeginning: 'אני מרגיש',
    imageUrl: 'https://i.ibb.co/B4Vdk8P/emotions.jpg',
    items: []
},{
    name: 'לאכול',
    sentenceBeginning: 'אני רוצה לאכול',
    imageUrl: 'https://i.ibb.co/qCKxqfs/food.jpg',
    items: []
},{
    name: 'לשחק',
    sentenceBeginning: 'אני רוצה לשחק',
    imageUrl: 'https://i.ibb.co/PNfDnJM/games.jpg',
    items: []
},{
    name: 'היגיינה',
    sentenceBeginning: 'אני רוצה',
    imageUrl: 'https://i.ibb.co/Y7NQ03j/hygiene.jpg',
    items: []
},{
    name: 'ספורט',
    sentenceBeginning: 'אני רוצה להתאמן ב',
    imageUrl: 'https://i.ibb.co/SK6rnBQ/sport.jpg',
    items: []
},{
    name: 'משפחה וחברים',
    sentenceBeginning: 'אני רוצה לפגוש את',
    imageUrl: 'https://i.ibb.co/Gn7QZfr/family.jpg',
    items: []
},{
    name: 'מקומות',
    sentenceBeginning: 'אני רוצה ללכת ל',
    imageUrl: 'https://i.ibb.co/XLdy7rp/locations.jpg',
    items: []
},{
    name: 'לימודים',
    sentenceBeginning: 'אני רוצה את ה',
    imageUrl: 'https://i.ibb.co/d2qNZXP/study.jpg',
    items: []
},{
    name: 'צפייה',
    sentenceBeginning: 'אני רוצה לראות',
    imageUrl: 'https://i.ibb.co/8cbj9VF/watch.jpg',
    items: []
},{
    name: 'שיחה',
    sentenceBeginning: '',
    imageUrl: 'https://i.ibb.co/x6KsbCF/chat.jpg',
    items: []
}];

export const initCategoriesDb = async () => {
    await Promise.all(
        categories.map(async (category) => await addCategory(category))
    );
    console.log('Finished initializing categories in DB');
}