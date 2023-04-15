import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C7F5FE",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10
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
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#A9C2C8"
    },
    forgotText: {
        height: 30,
        marginTop: 20,
        fontWeight: 'bold'
    },
    forgotLink: {
        color: '#349EC9',
        textDecorationLine: 'underline'
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