import React, { FC } from 'react';
import NavigationManager from "./components/NavigationManager";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import {View} from "react-native";
import Toast from "react-native-toast-message";
import {toastConfig} from "./styles/toast-confing";

const App: FC = () => {
    useAxiosInterceptor();

    return (
        <PersistGate persistor={persistor}>
            <View style={{zIndex:5}}>
                <Toast config={toastConfig}/>
            </View>
            <NavigationManager/>
        </PersistGate>
    );
}

export default App;
