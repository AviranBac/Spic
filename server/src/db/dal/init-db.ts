import {addCategory} from "./categories.dal";
import {Category} from "../schemas/category.schema";

const categories: Category[] = [{
    name: 'clothes',
    imageUrl: 'https://ibb.co/C7jghN1',
    items: []
},{
    name: 'emotions',
    imageUrl: 'https://ibb.co/gvMHYs7',
    items: []
},{
    name: 'food',
    imageUrl: 'https://ibb.co/tzg3jts',
    items: []
},{
    name: 'games',
    imageUrl: 'https://ibb.co/9NCZLBh',
    items: []
},{
    name: 'hygiene',
    imageUrl: 'https://ibb.co/27FhZyK',
    items: []
},{
    name: 'sport',
    imageUrl: 'https://ibb.co/zSmJRZ8',
    items: []
}];

export const initCategoriesDb = () => {
    categories.map(category => addCategory(category));
}