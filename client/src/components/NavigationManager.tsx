import React, { FC } from 'react';
import { useAppSelector } from "../store/hooks";
import { selectUserSession } from "../store/auth/auth.selectors";
import { NavigationContainer } from "@react-navigation/native";
import { Stack } from '../utils/navigation-stack';
import { HomeScreen } from "../screens/HomeScreen";
import { SignInScreen } from "../screens/SignInScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import { IUserSession } from "../store/auth/auth.model";

const NavigationManager: FC = () => {
    const userSession: IUserSession | null = useAppSelector(selectUserSession);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerTransparent: true, title: ''}}>
                {userSession ? (
                    <Stack.Screen name="Home" component={HomeScreen} />
                ) : (
                    <>
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default NavigationManager;