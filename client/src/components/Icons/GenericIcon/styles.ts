import {StyleSheet} from "react-native";

export const IconsStyles = StyleSheet.create({
    iconCircleWrapper: {
        position: "relative",
        width: 32,
        height: 32,
        borderRadius: 50,
        overflow: "hidden",
    },
    iconCirclePaper: {
        position: "absolute",
        top: "-35%",
        left: "-35%",
        width: "170%",
        height: "170%",
        zIndex: -1,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 50,
        transform: [{rotate: "45deg"}],
        justifyContent: "center",
        alignItems: "center",
    },
});