import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    itemsWrapper: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    },
    addItemIconContainer: {
        backgroundColor: '#009dff',
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    editModeWrapper: {
        flex:0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding:10,
        gap:10,
    }
});