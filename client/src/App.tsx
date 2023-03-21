import React from "react";
import {BottomBar} from "./Components/BottomBar/BottomBar";
import MainAppBar from "./Components/AppBar/MainAppBar";
import styled from "styled-components/native";

const Wrapper = styled.Modal`
    direction: rtl;
`

const App = () => {
    return (
        <Wrapper>
            <MainAppBar/>
            <BottomBar/>
        </Wrapper>
    );
}

export default App;
