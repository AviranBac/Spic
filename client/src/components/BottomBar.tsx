import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {HomeScreen} from "../screens/HomeScreen";
import {CommonlyUsedScreen} from "../screens/CommonlyUsedScreen";
import {SettingsScreen} from "../screens/SettingsScreen";
import {HomeStack} from "../utils/navigation-stack";
import {CategoryScreen} from "../screens/category/CategoryScreen";
import {AddItemScreen} from "../screens/AddItemScreen";
import {FavoritesScreen} from "../screens/FavoritesScreen/FavoritesScreen";

const Tab = createMaterialBottomTabNavigator();

const TABS = {
    HOME: "בית",
    COMMONLY_USED: 'בשימוש נפוץ',
    FAVORITES: 'מועדפים',
    SETTINGS: 'הגדרות משתמש'
}

const HomeStackContainer = () => (
    <HomeStack.Navigator screenOptions={{title: ''}}>
        <HomeStack.Screen name="Home"
                          component={HomeScreen}
                          options={{headerTransparent: true}}/>
        <HomeStack.Screen name="Category"
                          component={CategoryScreen}
                          options={{headerTitleAlign: 'center', headerStyle: {backgroundColor: '#f2f2f2'}}}/>
        <HomeStack.Screen name="AddItem"
                          component={AddItemScreen}
                          options={{headerTransparent: true}}/>
    </HomeStack.Navigator>
);

export const BottomBar = () => {
    return (
        <Tab.Navigator
            initialRouteName={TABS.HOME}
            activeColor="#009eff"
            inactiveColor="black"
            barStyle={{backgroundColor: '#c7f5fe'}}
        >
            <Tab.Screen
                name={TABS.SETTINGS} component={SettingsScreen}
                options={{
                    tabBarLabel: TABS.SETTINGS,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account" color={color} size={25}/>
                    )
                }}
            />
            <Tab.Screen
                name={TABS.FAVORITES} component={FavoritesScreen}
                options={{
                    tabBarLabel: TABS.FAVORITES,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="star" color={color} size={25}/>
                    )
                }}
            />
            <Tab.Screen
                name={TABS.COMMONLY_USED} component={CommonlyUsedScreen}
                options={{
                    tabBarLabel: TABS.COMMONLY_USED,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="clock" color={color} size={25}/>
                    )
                }}
            />
            <Tab.Screen
                name={TABS.HOME} component={HomeStackContainer}
                options={{
                    tabBarLabel: TABS.HOME,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" color={color} size={25}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}