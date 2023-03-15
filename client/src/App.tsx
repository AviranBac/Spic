import { View } from 'react-native';
import React, { FC } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

const App: FC = () => {
    return (
        <Provider store={store}>
            <View />
        </Provider>
    );
}

export default App;
