import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingTop: 10
    },
    hurdle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingLeft:10,
        marginTop: 20
    },
    hurdle_title: {
        color: '#333',
        fontSize: 18,
        marginLeft: 15
    },
    hurdle_edit: {
        height: 24,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ff6548',
        marginRight: 15,
        borderRadius: 12
    },
    hurdle_edit_text: {
        color: '#ff6548',
        fontSize: 16
    },
    // selected_container: {
    //     width: childrenWidth,
    //     height: childrenHeight,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    edit_mode: {
        // width: childrenWidth,
        // height: childrenHeight,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 5
    },
    // selected_item: {
    //     width: 72,
    //     height: 36,
    //     backgroundColor: '#f0f0f0',
    //     borderRadius: 2,
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    selected_item_fixed: {
        width: 72,
        height: 36,
        backgroundColor: '#949494',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selected_item_text: {
        fontSize: 16,
        color: '#444'
    },
    selected_item_text_fixed: {
        fontSize: 16,
        color: '#f0f0f0'
    },
    // selected_item_icon: {
    //     width: 16,
    //     height: 16,
    //     resizeMode: 'contain',
    //     position: 'absolute',
    //     top: (childrenHeight - itemHeight - 16) / 2 + 16 * 0.25, //下移点
    //     left: (childrenWidth + itemWidth - 16) / 2 - 16 * 0.25 //右移点，也可以换个布局
    // },
    unselected_item: {
        width: 72,
        height: 36,
        backgroundColor: '#f0f0f0',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    unselected_item_icon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginLeft: 6
    }
})
