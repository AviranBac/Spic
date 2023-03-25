import React from "react";
import { AppBar } from "@react-native-material/core";
import { Image, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "../../store/hooks";
import { logoutThunk } from "../../store/auth/auth.slice";

const logo = require('../../../assets/logo-spic.png');
export const MainAppBar = () => {
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logoutThunk());
    };

    return (
        <AppBar style={{backgroundColor: '#c7f5fe', paddingTop: (Platform.OS === 'ios') ? 20 : 0, flexDirection: "row", alignItems: "center"}}>
            <Image source={logo} style={{height: 35, width: 125}}/>
            <MaterialCommunityIcons name="logout" color="black" size={25} onPress={logoutHandler}/>
        </AppBar>
    );
}

export default MainAppBar;