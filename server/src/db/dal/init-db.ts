import {addCategory} from "./categories.dal";
import {Category} from "../schemas/category.schema";

const categories: Category[] = [{
    name: 'clothes',
    imageUrl: '../../../assets/images/clothes.jpeg',
    items: []
},{
    name: 'emotions',
    imageUrl: '../../../assets/images/emotions.jpeg',
    items: []
},{
    name: 'food',
    imageUrl: '../../../assets/images/food.jpeg',
    items: []
},{
    name: 'games',
    imageUrl: '../../../assets/images/games.jpeg',
    items: []
},{
    name: 'hygiene',
    imageUrl: '../../../assets/images/hygiene.jpeg',
    items: []
},{
    name: 'sport',
    imageUrl: '../../../assets/images/sport.jpeg',
    items: []
}];

export const initCategoriesDb = () => {
    categories.map(category => addCategory(category));
}