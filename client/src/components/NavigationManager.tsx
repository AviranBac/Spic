import React, { FC } from 'react';
import { useAppSelector } from "../store/hooks";
import { selectUserSession } from "../store/auth/auth.selectors";
import { Stack } from '../utils/navigation-stack';
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { IUserSession } from "../store/auth/auth.model";
import { BottomBar } from "./BottomBar";
import MainAppBar from "./MainAppBar";
import { NavigationContainer } from "@react-navigation/native";

const NavigationManager: FC = () => {
    const userSession: IUserSession | null = useAppSelector(selectUserSession);

    return (
        <NavigationContainer>
            {userSession ? (
                <>
                    <MainAppBar/>
                    <BottomBar/>
                </>
            ) : (
                <Stack.Navigator screenOptions={{headerTransparent: true, title: ''}}>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

export default NavigationManager;