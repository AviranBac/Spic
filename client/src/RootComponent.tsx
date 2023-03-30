import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import { FC } from "react";

const RootComponent: FC = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default RootComponent;