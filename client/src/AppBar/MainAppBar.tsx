import React from "react";
import {AppBar} from "@react-native-material/core";
import {Platform} from "react-native";
import {Image} from "react-native";

const logo = require('../../assets/logo-spic.png');
export const MainAppBar = () => {
    return (
        <AppBar style={{direction: "rtl", backgroundColor: '#c7f5fe', paddingTop: (Platform.OS === 'ios') ? 20 : 0}}>
            <Image source={logo} style={{height: 35, width: 125}}/>
        </AppBar>
    )
}

export default MainAppBar;