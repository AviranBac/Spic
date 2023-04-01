import { addCategory } from "./categories.dal";
import { Category } from "../schemas/category.schema";

const categories: Category[] = [{
    name: 'להתלבש',
    imageUrl: 'https://i.ibb.co/bB4TzqW/clothes.jpg',
    sentenceBeginning: 'מחכה ששוקר תסיים לעשות התחלות משפטים'
},{
    name: 'רגשות',
    imageUrl: 'https://i.ibb.co/B4Vdk8P/emotions.jpg',
    sentenceBeginning: 'מחכה ששוקר תסיים לעשות התחלות משפטים'
},{
    name: 'לאכול',
    imageUrl: 'https://i.ibb.co/qCKxqfs/food.jpg',
    sentenceBeginning: 'מחכה ששוקר תסיים לעשות התחלות משפטים'
},{
    name: 'לשחק',
    imageUrl: 'https://i.ibb.co/PNfDnJM/games.jpg',
    sentenceBeginning: 'מחכה ששוקר תסיים לעשות התחלות משפטים'
},{
    name: 'היגיינה',
    imageUrl: 'https://i.ibb.co/Y7NQ03j/hygiene.jpg',
    sentenceBeginning: 'מחכה ששוקר תסיים לעשות התחלות משפטים'
},{
    name: 'ספורט',
    imageUrl: 'https://i.ibb.co/SK6rnBQ/sport.jpg',
    sentenceBeginning: 'מחכה ששוקר תסיים לעשות התחלות משפטים'
},{
    name: 'משפחה וחברים',
    imageUrl: 'https://i.ibb.co/Gn7QZfr/family.jpg',
    sentenceBeginning: 'מחכה ששוקר תסיים לעשות התחלות משפטים'
},{
    name: 'מקומות',
    imageUrl: 'https://i.ibb.co/XLdy7rp/locations.jpg',
    sentenceBeginning: 'מחכה ששוקר תסיים לעשות התחלות משפטים'
},{
    name: 'לימודים',
    imageUrl: 'https://i.ibb.co/d2qNZXP/study.jpg',
    sentenceBeginning: 'מחכה ששוקר תסיים לעשות התחלות משפטים'
},{
    name: 'צפייה',
    imageUrl: 'https://i.ibb.co/8cbj9VF/watch.jpg',
    sentenceBeginning: 'מחכה ששוקר תסיים לעשות התחלות משפטים'
},{
    name: 'שיחה',
    imageUrl: 'https://i.ibb.co/x6KsbCF/chat.jpg',
    sentenceBeginning: 'מחכה ששוקר תסיים לעשות התחלות משפטים'
}];

export const initCategoriesDb = async () => {
    await Promise.all(
        categories.map(async (category) => await addCategory(category))
    );
    console.log('Finished initializing categories in DB');
}