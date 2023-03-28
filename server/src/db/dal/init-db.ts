import { addCategory } from "./categories.dal";
import { Category } from "../schemas/category.schema";

const categories: Category[] = [{
    name: 'להתלבש',
    imageUrl: 'https://i.ibb.co/bB4TzqW/clothes.jpg',
    items: []
},{
    name: 'רגשות',
    imageUrl: 'https://i.ibb.co/B4Vdk8P/emotions.jpg',
    items: []
},{
    name: 'לאכול',
    imageUrl: 'https://i.ibb.co/qCKxqfs/food.jpg',
    items: []
},{
    name: 'לשחק',
    imageUrl: 'https://i.ibb.co/PNfDnJM/games.jpg',
    items: []
},{
    name: 'הגיינה',
    imageUrl: 'https://i.ibb.co/Y7NQ03j/hygiene.jpg',
    items: []
},{
    name: 'ספורט',
    imageUrl: 'https://i.ibb.co/SK6rnBQ/sport.jpg',
    items: []
},{
    name: 'משפחה וחברים',
    imageUrl: 'https://i.ibb.co/Gn7QZfr/family.jpg',
    items: []
},{
    name: 'מקומות',
    imageUrl: 'https://i.ibb.co/XLdy7rp/locations.jpg',
    items: []
},{
    name: 'לימודים',
    imageUrl: 'https://i.ibb.co/GH600qs/learn.jpg',
    items: []
},{
    name: 'צפייה',
    imageUrl: 'https://i.ibb.co/8cbj9VF/watch.jpg',
    items: []
},{
    name: 'שיחה',
    imageUrl: 'https://i.ibb.co/x6KsbCF/chat.jpg',
    items: []
}];

export const initCategoriesDb = async () => {
    await Promise.all(
        categories.map(async (category) => await addCategory(category))
    );
    console.log('Finished initializing categories in DB');
}