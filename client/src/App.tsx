import React, { FC } from 'react';
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import NavigationManager from "./components/NavigationManager";
import { PersistGate } from "redux-persist/integration/react";

const App: FC = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <NavigationManager />
            </PersistGate>
        </Provider>
    );
}

export default App;
