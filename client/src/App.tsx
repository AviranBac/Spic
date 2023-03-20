import React from "react";
import {ButtomBar} from "./Components/ButtomBar/ButtomBar";
import MainAppBar from "./Components/AppBar/MainAppBar";
import styled from "styled-components/native";

const Wrapper = styled.Modal`
    direction: rtl;
`

const App = () => {
    return (
        <Wrapper>
            <MainAppBar/>
            <ButtomBar/>
        </Wrapper>
    );
}

export default App;
