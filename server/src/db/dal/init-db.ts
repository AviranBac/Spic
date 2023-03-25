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
}];

export const initCategoriesDb = () => {
    categories.map(category => addCategory(category));
    console.log('Finished initializing categories in DB');
}