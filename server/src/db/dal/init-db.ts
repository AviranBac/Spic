import {addCategory} from "./categories.dal";
import {Category} from "../schemas/category.schema";

const categories: Category[] = [{
    name: 'clothes',
    imageUrl: 'https://i.ibb.co/bB4TzqW/clothes.jpg',
    items: []
},{
    name: 'emotions',
    imageUrl: 'https://i.ibb.co/B4Vdk8P/emotions.jpg',
    items: []
},{
    name: 'food',
    imageUrl: 'https://i.ibb.co/qCKxqfs/food.jpg',
    items: []
},{
    name: 'games',
    imageUrl: 'https://i.ibb.co/PNfDnJM/games.jpg',
    items: []
},{
    name: 'hygiene',
    imageUrl: 'https://i.ibb.co/Y7NQ03j/hygiene.jpg',
    items: []
},{
    name: 'sport',
    imageUrl: 'https://i.ibb.co/SK6rnBQ/sport.jpg',
    items: []
}];

export const initCategoriesDb = () => {
    categories.map(category => addCategory(category));
}