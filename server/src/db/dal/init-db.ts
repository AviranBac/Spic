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
    itemNames: ['חֻלְצָה', 'מִכֶּנֶס', 'שִׂמְלָה', 'חֲצָאִית', 'נַעֲלֵי סְפּוֹרְט', 'כּוֹבַע מִצַּחֶיהָ', 'מְעִיל', 'חֲגוֹרָה', 'צָעִיף', 'סְוֵדֶר', 'בִּגְדֵי סְפּוֹרְט', 'טַיְץ',
    'מַגָּפַיִם',  'סַנְדָּלִים',  'כַּפְכַּפִּים',  'גַּרְבִּיּוֹן', 'גּוּפִיָּה',  'זָקֵט',  'כּוֹבַע גֶּרֶב',  'גַּרְבַּיִם']
},{
    name: 'רגשות',
    sentenceBeginning: 'אני מרגיש ',
    imageUrl: 'https://i.ibb.co/B4Vdk8P/emotions.jpg',
    itemNames: ['בִּלְבּוּל', 'רָעָב', 'עֲיֵפוּת', 'עֶצֶב', 'כַּעַס', 'שִׂנְאָה', 'אַהֲבָה', 'שְׂמֵחָה', 'יֵאוּשׁ', 'נַחַת', 'סִפּוּק', 'הַצְלָחָה']
},{
    name: 'אוכל',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/qCKxqfs/food.jpg',
    itemNames: ['פִּיצָה', 'הַמְבּוּרְגֵּר', 'קוֹלָה', 'בָּנָנָה', 'גְּלִידָה', 'שׁוֹקוֹלָד', 'מְלָפְפוֹן', 'עַגְבָנִיָּה', 'פִּלְפֵּל', 'אָנָנָס', 'תּוּת', 'אֲפַרְסֵק', 'כָּרִיךְ'
    , 'חֲבִיתָה', 'בֵּיצָה', 'קְצִיצָה', 'פַּסְטָה', 'אֹרֶז', 'פִּירֶה', 'פְּתִיתִים', 'סוּשִׁי', 'נוּדֵלְס', 'מַיִם', 'מִיץ', 'סוֹדָה', 'שְׁנִיצֶל', 'בָּשָׂר', 'קוֹרְנְפְלֵקְס'
    , 'לֶחֶם', 'לַחְמָנִיָּה', 'שׁוֹקוֹ', 'חָלָב', 'שַׁקְשׁוּקָה', 'חוּמוּס', 'סָלָט', 'גֶּזֶר', 'תַּפּוּחַ', 'אַגָּס', 'קִנּוּחַ', 'עוּגָה', 'עוּגִיָּה', 'גְּבִינָה', 'טוֹסְט']
},{
    name: 'משחק',
    sentenceBeginning: ' אני רוצה לשחק ב ',
    imageUrl: 'https://i.ibb.co/PNfDnJM/games.jpg',
    itemNames: ['כַּדּוּרְסַל', 'כַּדּוּרֶגֶל', 'לֵגוֹ', 'פָּזֶל', 'מַחְשֵׁב', 'בֻּבּוֹת', 'קֻבִּיּוֹת', 'מִשְׂחַק קֻפְסָה', 'כַּדּוּר', 'חֲבֵרִים', 'חוֹל']
},{
    name: 'היגיינה',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/Y7NQ03j/hygiene.jpg',
    itemNames: ['לְנַקּוֹת', 'לְהִתְקַלֵּחַ', 'לִשְׁטֹף יָדַיִם', 'לְצַחְצֵחַ שִׁנַּיִם', 'שֵׁרוּתִים']
},{
    name: 'ספורט',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/SK6rnBQ/sport.jpg',
    itemNames: ['לְשַׂחֵק ', 'לְשַׂחֵק כַּדּוּרֶגֶל', 'לְשַׂחֵק כַּדּוּרְסַל', 'לָרוּץ', 'לִקְפֹּץ', 'לְהִתְעַמֵּל', 'לְשַׂחֵק כַּדּוּרְעַף', 'לִרְקֹד', 'לִשְׂחוֹת']
},{
    name: 'משפחה וחברים',
    sentenceBeginning: '',
    imageUrl: 'https://i.ibb.co/Gn7QZfr/family.jpg',
    itemNames:['סָבְתָא','סַבָּא', 'אָחוֹת', 'אָח', 'אַבָּא', 'אִמָּא', 'חֲבֵרָה', 'חָבֵר', 'דָּוִד', 'דּוֹדָה', 'בֶּן דָּוִד', 'בַּת דּוֹדָה', 'אַחְיָן', 'אַחְיָנִית']
},{
    name: 'מקומות',
    sentenceBeginning: 'אני רוצה ללכת ל',
    imageUrl: 'https://i.ibb.co/XLdy7rp/locations.jpg',
    itemNames: ['בַּיִת', 'בֵּית סֵפֶר', 'יַעַר', 'חוּג', 'מִשְׂחָקֶיהָ', 'קַנְיוֹן', 'מִגְרָשׁ', 'חֲבֵרִים', 'כִּתָּה', 'קַיְטָנָה', 'סַבָּא וְסַבְתָּא', 'בְּרֵכָה'
    , 'יָם', 'גַּן חַיּוֹת', 'פַּארְק']
},{
    name: 'לימודים',
    sentenceBeginning: 'אני רוצה ',
    imageUrl: 'https://i.ibb.co/d2qNZXP/study.jpg',
    itemNames: ['מָחַק', 'עִפָּרוֹן', 'סֵפֶר', 'מִסְפָּרַיִם', 'מְחַבֶּרֶת', 'מוֹרֶה', 'מוֹרָהּ', 'שִׁעוּר', 'הַפְסָקָה', 'מְחַדֵּד', 'עֵט', 'צְבָעִים', 'קַלְמָר', 'תִּיק']
},{
    name: 'צפייה',
    sentenceBeginning: 'אני רוצה לראות ',
    imageUrl: 'https://i.ibb.co/8cbj9VF/watch.jpg',
    itemNames: ['טֵלֵוִיזְיָה', 'סֶרֶט', 'סִדְרָה', 'הוֹפָעָה', 'כּוֹכָבִים']
},{
    name: 'שיחה',
    sentenceBeginning: '',
    imageUrl: 'https://i.ibb.co/x6KsbCF/chat.jpg',
    itemNames: ['שָׁלוֹם', 'מָה שְׁלוֹמְךָ?', 'מָה שְׁלוֹמֵךְ?', 'אֲנִי', 'אַתָּה', 'אַתְּ', 'אֲנַחְנוּ', 'רוֹצֶה?', 'יוֹדֵעַ?', 'אֵיפֹה?', 'מָתַי?', 'כַּמָּה?', 'לָמָּה?', 'מָה?']
},{
    name: 'פעולות',
    sentenceBeginning: 'אני רוצה',
    imageUrl: 'https://i.ibb.co/x6KsbCF/chat.jpg',
    itemNames: ['לָלֶכֶת לִישֹׁן', 'לְשַׂחֵק', 'לְנַקּוֹת', 'לָלֶכֶת', 'לְטַיֵּל', 'לְצַיֵּר', 'לָנוּחַ', 'לְבַשֵּׁל', 'לָשִׁיר', 'לִכְתֹּב']
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