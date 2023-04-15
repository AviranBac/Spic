import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    modalChild: {
        backgroundColor: '#c7f5fe',
        borderColor: '#70cdff',
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        position: 'relative'
    },
    itemTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        gap: 10,
        maxWidth: 200
    },
    itemText: {
        textAlign: 'center'
    },
    activeItemImage: {
        marginHorizontal: 10,
        borderRadius: 75,
        height: 150,
        width: 150
    },
    closeModalIcon: {
        backgroundColor: "#009dff",
        position: 'absolute',
        top: -10,
        left: -10
    },
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
    }
});