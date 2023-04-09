import { addCategory } from "./categories.dal";
import { Category } from "../schemas/category.schema";

const categories: Category[] = [{
    name: 'לבוש',
    sentenceBeginning: 'אני רוצה ללבוש',
    imageUrl: 'https://i.ibb.co/bB4TzqW/clothes.jpg'
},{
    name: 'רגשות',
    sentenceBeginning: 'אני מרגיש',
    imageUrl: 'https://i.ibb.co/B4Vdk8P/emotions.jpg'
},{
    name: 'אוכל',
    sentenceBeginning: 'אני רוצה',
    imageUrl: 'https://i.ibb.co/qCKxqfs/food.jpg'
},{
    name: 'משחק',
    sentenceBeginning: 'אני רוצה לשחק',
    imageUrl: 'https://i.ibb.co/PNfDnJM/games.jpg'
},{
    name: 'היגיינה',
    sentenceBeginning: 'אני רוצה',
    imageUrl: 'https://i.ibb.co/Y7NQ03j/hygiene.jpg'
},{
    name: 'ספורט',
    sentenceBeginning: 'אני רוצה',
    imageUrl: 'https://i.ibb.co/SK6rnBQ/sport.jpg'
},{
    name: 'משפחה וחברים',
    sentenceBeginning: '',
    imageUrl: 'https://i.ibb.co/Gn7QZfr/family.jpg'
},{
    name: 'מקומות',
    sentenceBeginning: 'אני רוצה ללכת ל',
    imageUrl: 'https://i.ibb.co/XLdy7rp/locations.jpg'
},{
    name: 'לימודים',
    sentenceBeginning: 'אני רוצה את ה',
    imageUrl: 'https://i.ibb.co/d2qNZXP/study.jpg'
},{
    name: 'צפייה',
    sentenceBeginning: 'אני רוצה לראות',
    imageUrl: 'https://i.ibb.co/8cbj9VF/watch.jpg'
},{
    name: 'שיחה',
    sentenceBeginning: '',
    imageUrl: 'https://i.ibb.co/x6KsbCF/chat.jpg'
}];

export const initCategoriesDb = async () => {
    await Promise.all(
        categories.map(async (category) => await addCategory(category))
    );
    console.log('Finished initializing categories in DB');
}