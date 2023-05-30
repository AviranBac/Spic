import {createStackNavigator} from "@react-navigation/stack";
import {Category} from "../models/category";

export type UnauthenticatedStackParamList = {
    Login: {},
    Register: {}
};
export const UnauthenticatedStack = createStackNavigator<UnauthenticatedStackParamList>();

export type HomeStackParamList = {
    Home: {},
    Category: {
        category: Category
    },
    UpsertItem: {
        category: Category;
        itemId?: string;
        imageUri?: string;
        itemName?: string;
    }
};
export const HomeStack = createStackNavigator<HomeStackParamList>();