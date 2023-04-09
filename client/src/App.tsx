import React, { FC } from 'react';
import NavigationManager from "./components/NavigationManager";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const App: FC = () => {
    useAxiosInterceptor();

    return (
        <PersistGate persistor={persistor}>
            <NavigationManager/>
        </PersistGate>
    );
}

export default App;
