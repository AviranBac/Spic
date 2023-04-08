import { createStackNavigator } from "@react-navigation/stack";
import { Category } from "../models/category";

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
    AddItem: {
        category: Category
    }
};
export const HomeStack = createStackNavigator<HomeStackParamList>();