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
    sentenceBeginning: 'אני רוצה ללבוש ',
    imageUrl: 'https://i.ibb.co/bB4TzqW/clothes.jpg',
    itemNames: ['חולצה', 'מכנס', 'שמלה', 'חצאית', 'נעלי ספורט', 'כובע מצחיה', 'מעיל', 'חגורה', 'צעיף', 'סוודר', 'בגדי ספורט', 'טייץ',
    'מגפיים',  'סנדלים',  'כפכפים',  'גרביון', 'גופיה',  'זקט',  'כובע גרב',  'גרבים']
},{
    name: 'רגשות',
    sentenceBeginning: 'אני מרגיש ',
    imageUrl: 'https://i.ibb.co/B4Vdk8P/emotions.jpg',
    itemNames: ['בלבול', 'רעב', 'עייפות', 'עצב', 'כעס', 'שנאה', 'אהבה', 'שמחה', 'יאוש', 'נחת', 'סיפוק', 'הצלחה']
},{
    name: 'אוכל',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/qCKxqfs/food.jpg',
    itemNames: ['פיצה', 'המבורגר', 'קולה', 'בננה', 'גלידה', 'שוקולד', 'מלפפון', 'עגבניה', 'פלפל', 'אננס', 'תות', 'אפרסק', 'כריך'
    , 'חביתה', 'ביצה', 'קציצה', 'פסטה', 'ארז', 'פירה', 'פתיתים', 'סושי', 'נודלס', 'מים', 'מיץ', 'סודה', 'שניצל', 'בשר', 'קורנפלקס'
    , 'לחם', 'לחמניה', 'שוקו', 'חלב', 'שקשוקה', 'חומוס', 'סלט', 'גזר', 'תפוח', 'אגס', 'קנוח', 'עוגה', 'עוגיה', 'גבינה', 'טוסט']
},{
    name: 'משחק',
    sentenceBeginning: ' אני רוצה לשחק ב ',
    imageUrl: 'https://i.ibb.co/PNfDnJM/games.jpg',
    itemNames: ['כדורסל', 'כדורגל', 'לגו', 'פאזל', 'מחשב', 'בובות', 'קוביות', 'משחק קפסה', 'כדור', 'חברים', 'חול']
},{
    name: 'היגיינה',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/Y7NQ03j/hygiene.jpg',
    itemNames: ['לנקות', 'להתקלח', 'לשטוף ידים', 'לצחצח שיניים', 'שירותים']
},{
    name: 'ספורט',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/SK6rnBQ/sport.jpg',
    itemNames: ['לשחק ', 'לשחק כדורגל', 'לשחק כדורסל', 'לרוץ', 'לקפץ', 'להתעמל', 'לשחק כדורעף', 'לרקוד', 'לשחות', 'לרכב על אופניים']
},{
    name: 'משפחה וחברים',
    sentenceBeginning: '',
    imageUrl: 'https://i.ibb.co/Gn7QZfr/family.jpg',
    itemNames:['סבתא','סבא', 'אחות', 'אח', 'אבא', 'אמא', 'חברה', 'חבר', 'דוד', 'דודה', 'בן דוד', 'בת דודה', 'אחיין', 'אחיינית']
},{
    name: 'מקומות',
    sentenceBeginning: 'אני רוצה ללכת ל',
    imageUrl: 'https://i.ibb.co/XLdy7rp/locations.jpg',
    itemNames: ['בית', 'בית ספר', 'יער', 'חוג', 'משחקיה', 'קניון', 'מגרש', 'חברים', 'כיתה', 'קיטנה', 'סבא וסבתא', 'בריכה'
    , 'ים', 'גן חיות', 'פארק']
},{
    name: 'לימודים',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/d2qNZXP/study.jpg',
    itemNames: ['מחק', 'עפרון', 'ספר', 'מספריים', 'מחברת', 'מורה', 'מורה', 'שיעור', 'הפסקה', 'מחדד', 'עט', 'צבעים', 'קלמר', 'תיק']
},{
    name: 'צפייה',
    sentenceBeginning: 'אני רוצה לראות ',
    imageUrl: 'https://i.ibb.co/8cbj9VF/watch.jpg',
    itemNames: ['טלויזיה', 'סרט', 'סדרה', 'הופעה', 'כוכבים']
},{
    name: 'שיחה',
    sentenceBeginning: '',
    imageUrl: 'https://i.ibb.co/x6KsbCF/chat.jpg',
    itemNames: ['שלום', 'מה שלומך?', 'אני', 'אתה', 'את', 'אנחנו', 'רוצה?', 'יודע?', 'איפה?', 'מתי?', 'כמה?', 'למה?', 'מה?']
},{
    name: 'פעולות',
    sentenceBeginning: 'אני רוצה',
    imageUrl: 'https://i.ibb.co/x6KsbCF/chat.jpg',
    itemNames: ['ללכת לישון', 'לשחק', 'לנקות', 'ללכת', 'לטייל', 'לצייר', 'לנוח', 'לבשל', 'לשיר', 'לכתוב']
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