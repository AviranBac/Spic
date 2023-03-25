import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeScreen } from "../../Screens/HomeScreen";
import { FavoritesScreen } from "../../Screens/FavoritesScreen";
import { RecentScreen } from "../../Screens/RecentsScreen";
import { SettingsScreen } from "../../Screens/SettingsScreen";

const Tab = createMaterialBottomTabNavigator();

const TABS = {
    HOME: "בית",
    COMMONLY_USED: 'בשימוש נפוץ',
    FAVORITES: 'מועדפים',
    SETTINGS: 'הגדרות משתמש'
}

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
                    ),
                }}
            />
            <Tab.Screen
                name={TABS.FAVORITES} component={FavoritesScreen}
                options={{
                    tabBarLabel: TABS.FAVORITES,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="star" color={color} size={25}/>
                    ),
                }}
            />
            <Tab.Screen
                name={TABS.COMMONLY_USED} component={RecentScreen}
                options={{
                    tabBarLabel: TABS.COMMONLY_USED,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="clock" color={color} size={25}/>
                    ),
                }}
            />
            <Tab.Screen
                name={TABS.HOME} component={HomeScreen}
                options={{
                    tabBarLabel: TABS.HOME,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" color={color} size={25}/>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}