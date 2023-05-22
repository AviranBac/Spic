import { addCategory } from "../dal/categories.dal";
import { Category, CategoryModel } from "../schemas/category.schema";
import mongoose from "mongoose";
import { Item, ItemModel } from "../schemas/item.schema";
import { getPhotos } from "../../services/photos";
import { addItem, ItemWithId } from "../dal/items.dal";
import { ChosenItemRecordModel } from "../schemas/chosen-item-record.schema";
import { FeedbackModel } from "../schemas/feedback.schema";
import { categoriesWithItems, CategoryWithItems, hardcodedImageUrls } from "./hard-coded-data";
import { UserPreferences, UserPreferencesModel } from "../schemas/user-preferences.schema";
import { getAllUserIds } from "../dal/users.dal";
import { getInitialPreferences } from "../dal/user-preferences/user-preferences.dal";

export const initDb = async () => {
    const shouldInit: boolean = !(await CategoryModel.count().exec() && await ItemModel.count().exec());

    if (shouldInit) {
        await CategoryModel.deleteMany({});
        await ChosenItemRecordModel.deleteMany({});
        await FeedbackModel.deleteMany({});
        await ItemModel.deleteMany({});
        await UserPreferencesModel.deleteMany({});

        await initCategoriesDb();
        await initItemsDb();
        await initUserPreferencesDb();
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
            const addedItem: ItemWithId = await addItem(item);
            console.log(`Saved item in DB: ${JSON.stringify(addedItem)}`);
        })
    );
    console.log('Finished initializing items for category in DB');
}

const getItemsFromUnsplash = async (itemsNames: string[], categoryId: mongoose.Types.ObjectId): Promise<Item[]> => {
    const items: Item[] = [];

    for (const itemName of itemsNames) {
        let imageUrl : string = '';

        const hardcodedImgUrl : string | undefined =  hardcodedImageUrls[itemName];
        if (hardcodedImgUrl) {
            imageUrl = hardcodedImgUrl;
        } else {
            try {
                const photos : string[] = await getPhotos(itemName);
                imageUrl = photos[0];
            } catch (error) {
                console.error(`Failed while getting photos for ${itemName} from Unsplash. Error: ${JSON.stringify(error)}`);
            }
        }

        items.push({
            name: itemName,
            imageUrl,
            categoryId
        });
    }

    return items;
};

const initUserPreferencesDb = async () => {
    const allUserIds: mongoose.Types.ObjectId[] = await getAllUserIds();

    if (allUserIds.length) {
        const initialPreferences: Omit<UserPreferences, 'userId'> = await getInitialPreferences();

        await Promise.all(allUserIds.map(async (userId: mongoose.Types.ObjectId) => {
            await (new UserPreferencesModel({...initialPreferences, userId})).save();
            console.log(`Saved user preferences in DB. userId: ${userId.toString()}`);
        }));

        console.log(`Saved all user preferences in DB`);
    }
}