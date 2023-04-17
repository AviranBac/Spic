import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C7F5FE",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10
    },
    dropdown: {
        height: 50,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        width: "70%",
        borderColor: '#FFFFFF',
        borderWidth: 0.5,
        borderRadius: 30,
        marginBottom: 20
    },
    placeholderStyle: {
        fontSize: 14,
        textAlign: 'center',
        placeholderTextColor: '#003f5c'
    },
    selectedTextStyle: {
        fontSize: 14,
        textAlign: 'center',
        placeholderTextColor: '#003f5c'
    },
    image: {
        marginBottom: 40
    },
    inputView: {
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        textAlign: "center"
    },
    registerBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#A9C2C8"
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginBottom: 10
    },
    backendHebrewErrorContainer: {
        marginTop: 10
    }
});