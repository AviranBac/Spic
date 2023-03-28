import React, { FC } from 'react';
import { persistor } from "./store/store";
import NavigationManager from "./components/NavigationManager";
import { PersistGate } from "redux-persist/integration/react";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";

const App: FC = () => {
    useAxiosInterceptor();

    return (
        <PersistGate persistor={persistor}>
            <NavigationManager />
        </PersistGate>
    );
}

export default App;
