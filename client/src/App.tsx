import React, {FC} from "react";
import {BottomBar} from "./ButtomBar/BottomBar";
import MainAppBar from "./AppBar/MainAppBar";
import {View} from "react-native";

const App: FC = () => {
    return (
        <>
            <MainAppBar/>
            <BottomBar/>
        </>
    );
}

export default App;
