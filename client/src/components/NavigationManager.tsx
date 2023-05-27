import React, {FC} from 'react';
import {useAppSelector} from "../store/hooks";
import {selectUserSession} from "../store/auth/auth.selectors";
import {UnauthenticatedStack} from '../utils/navigation-stack';
import {LoginScreen} from "../screens/LoginScreen/LoginScreen";
import {RegisterScreen} from "../screens/RegisterScreen/RegisterScreen";
import {IUserSession} from "../store/auth/auth.model";
import {BottomBar} from "./BottomBar";
import MainAppBar from "./MainAppBar/MainAppBar";
import {NavigationContainer} from "@react-navigation/native";
import {View} from "react-native";
import {selectGender} from "../store/user-details/user-details.selectors";
import {Gender} from "../store/user-details/user-details.model";
import Toast from "react-native-toast-message";

const ReLogin = () => <UnauthenticatedStack.Navigator screenOptions={{headerTransparent: true, title: ''}}>
    <UnauthenticatedStack.Screen name="Login" component={LoginScreen}/>
    <UnauthenticatedStack.Screen name="Register" component={RegisterScreen}/>
</UnauthenticatedStack.Navigator>

const NavigationManager: FC = () => {
    const userSession: IUserSession | null = useAppSelector(selectUserSession);

    const gender: Gender | undefined = useAppSelector(selectGender);
    if (!gender) {
        Toast.show({
            type: 'error',
            text1: 'שגיאה',
            text2: 'מתחבר מחדש 🚫',
        })
    }

    return (
        <NavigationContainer>
            {userSession ? (
                <View style={{flex: 1}}>
                    <MainAppBar/>
                    {gender ? <BottomBar/> : <ReLogin/>}
                </View>
            ) : (
                <ReLogin/>
            )}
        </NavigationContainer>
    );
}

export default NavigationManager;