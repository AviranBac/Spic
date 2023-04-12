import React, { FC } from 'react';
import { useAppSelector } from "../store/hooks";
import { selectUserSession } from "../store/auth/auth.selectors";
import { UnauthenticatedStack } from '../utils/navigation-stack';
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { IUserSession } from "../store/auth/auth.model";
import { BottomBar } from "./BottomBar";
import MainAppBar from "./MainAppBar/MainAppBar";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

const NavigationManager: FC = () => {
    const userSession: IUserSession | null = useAppSelector(selectUserSession);

    return (
        <NavigationContainer>
            {userSession ? (
                <View style={{flex: 1}}>
                    <MainAppBar/>
                    <BottomBar/>
                </View>
            ) : (
                <UnauthenticatedStack.Navigator screenOptions={{headerTransparent: true, title: ''}}>
                    <UnauthenticatedStack.Screen name="Login" component={LoginScreen}/>
                    <UnauthenticatedStack.Screen name="Register" component={RegisterScreen}/>
                </UnauthenticatedStack.Navigator>
            )}
        </NavigationContainer>
    );
}

export default NavigationManager;