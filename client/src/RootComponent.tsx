import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import { FC } from "react";
import styled from "styled-components/native";

const Wrapper = styled.Modal`
  direction: rtl;
`

const RootComponent: FC = () => (
    <Provider store={store}>
        <Wrapper>
            <App />
        </Wrapper>
    </Provider>
);

export default RootComponent;