import { addCategory } from "./categories.dal";
import { Category, CategoryModel } from "../schemas/category.schema";
import mongoose from "mongoose";
import { Item, ItemModel } from "../schemas/item.schema";
import { getPhotos } from "../../services/photos";
import { addItem } from "./items.dal";

interface CategoryWithItems extends Category {
    itemNames: string[]
}

const categoriesWithItems: CategoryWithItems[] = [{
    name: 'לבוש',
    sentenceBeginning: 'אני רוצה ללבוש',
    imageUrl: 'https://i.ibb.co/bB4TzqW/clothes.jpg',
    itemNames: ['חולצה', 'מכנס', 'שמלה', 'חצאית', 'נעליים', 'כובע', 'מעיל']
},{
    name: 'רגשות',
    sentenceBeginning: 'אני מרגיש',
    imageUrl: 'https://i.ibb.co/B4Vdk8P/emotions.jpg',
    itemNames: ['בלבול', 'רעב', 'עייפות', 'עצב', 'כעס', 'שנאה', 'אהבה']
},{
    name: 'אוכל',
    sentenceBeginning: 'אני רוצה',
    imageUrl: 'https://i.ibb.co/qCKxqfs/food.jpg',
    itemNames: ['פיצה', 'המבורגר', 'קולה', 'בננה', 'גלידה', 'שוקולד', 'מלפפון']
},{
    name: 'משחק',
    sentenceBeginning: 'אני רוצה לשחק',
    imageUrl: 'https://i.ibb.co/PNfDnJM/games.jpg',
    itemNames: ['כדורסל', 'כדורגל', 'לגו', 'פאזל', 'מחשב', 'בובות', 'קוביות']
},{
    name: 'היגיינה',
    sentenceBeginning: 'אני רוצה',
    imageUrl: 'https://i.ibb.co/Y7NQ03j/hygiene.jpg',
    itemNames: ['לנקות', 'להתקלח', 'לשטוף ידיים', 'לצחצח שיניים', 'שירותים']
},{
    name: 'ספורט',
    sentenceBeginning: 'אני רוצה',
    imageUrl: 'https://i.ibb.co/SK6rnBQ/sport.jpg',
    itemNames: ['כדורסל', 'כדורגל', 'ריצה', 'קפיצה', 'התעמלות', 'כדורעף']
},{
    name: 'משפחה וחברים',
    sentenceBeginning: '',
    imageUrl: 'https://i.ibb.co/Gn7QZfr/family.jpg',
    itemNames: ['סבתא','סבא', 'אחות', 'אח', 'אבא', 'אמא', 'חברה', 'חבר']
},{
    name: 'מקומות',
    sentenceBeginning: 'אני רוצה ללכת ל',
    imageUrl: 'https://i.ibb.co/XLdy7rp/locations.jpg',
    itemNames: ['בית', 'בית ספר', 'יער', 'חוג', 'משחקיה', 'קניון', 'מגרש']
},{
    name: 'לימודים',
    sentenceBeginning: 'אני רוצה את ה',
    imageUrl: 'https://i.ibb.co/d2qNZXP/study.jpg',
    itemNames: ['מחק', 'עיפרון', 'ספר', 'מחברת', 'מורה', 'שיעור', 'הפסקה']
},{
    name: 'צפייה',
    sentenceBeginning: 'אני רוצה לראות',
    imageUrl: 'https://i.ibb.co/8cbj9VF/watch.jpg',
    itemNames: ['טלוויזיה', 'סרט', 'סדרה', 'מופע', 'כוכבים']
},{
    name: 'שיחה',
    sentenceBeginning: '',
    imageUrl: 'https://i.ibb.co/x6KsbCF/chat.jpg',
    itemNames: ['שלום', 'מה שלומך?', 'אני', 'אתה', 'רוצה?', 'יודע?', 'איפה?']
}];

export const initCategoriesAndItemsInDb = async () => {
    const shouldInit: boolean = !(await CategoryModel.count().exec() && await ItemModel.count().exec());

    if (shouldInit) {
        await CategoryModel.deleteMany({});
        await ItemModel.deleteMany({});
        await initCategoriesDb();
        await initItemsDb();
    } else {
        console.log('Both categories and items are already initialized, therefore not initializing them again');
    }
};

const initCategoriesDb = async () => {
    await Promise.all(
        categoriesWithItems.map(async ({name, imageUrl, sentenceBeginning}) => {
            const addedCategory: Category = await addCategory({name, imageUrl, sentenceBeginning});
            console.log(`Saved category in DB: ${JSON.stringify(addedCategory)}`);
        })
    );
    console.log('Finished initializing categories in DB');
}

const initItemsDb = async () => {
    const categoriesWithIds: CategoryWithItems[] = await Promise.all(
        categoriesWithItems.map(async (categoryWithItems: CategoryWithItems) => ({
            ...categoryWithItems,
            id: (await CategoryModel.findOne({name: categoryWithItems.name}).exec())!.id
        }))
    );

    await Promise.all(
        categoriesWithIds.map(async ({id, name, itemNames}) => {
            await initItemsForCategoryDb(itemNames, id!);
            console.log(`Finished initializing all items in DB for ${name} category`);
        })
    );
}

const initItemsForCategoryDb = async (itemsNames: string[], categoryId: mongoose.Types.ObjectId) => {
    const items: Item[] = await getItemsFromUnsplash(itemsNames, categoryId);
    await Promise.all(
        items.map(async (item: Item) => {
            const addedItem: Item = await addItem(item);
            console.log(`Saved item in DB: ${JSON.stringify(addedItem)}`);
        })
    );
    console.log('Finished initializing items for category in DB');
}

const getItemsFromUnsplash = async (itemsNames: string[], categoryId: mongoose.Types.ObjectId): Promise<Item[]> => {
    const items: Item[] = [];

    for (const itemName of itemsNames) {
        const photos: string[] = await getPhotos(itemName);

        items.push({
            name: itemName,
            imageUrl: photos[0],
            categoryId
        });
    }

    return items;
};