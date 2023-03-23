import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import AuthService from "../services/auth.service";
import { IContextType, SessionContext } from "../services/session-context.service";
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../utils/navigation-stack";

type SignInScreenProps = StackScreenProps<RootStackParamList>;

export const SignInScreen = ({ navigation } : SignInScreenProps) => {
    const context = useContext<IContextType | null>(SessionContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSignInPress = async () => {
        try {
            const userSession = await AuthService.signIn(email, password);
            if (context !== null) context.updateSession(userSession);
        } catch (err) {
            console.error(JSON.stringify(err));
        }
    };

    return (<View style={styles.container}>
        <Image style={styles.image} source={require("../../assets/logo-spic.png")} />
        <StatusBar style="auto" />
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="אימייל"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
            />
        </View>
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="סיסמה"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
            />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={onSignInPress}>
            <Text>התחבר</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp', {})}>
            <Text style={styles.forgot_button}>אין לך משתמש? הירשם כאן</Text>
        </TouchableOpacity>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C7F5FE",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#A9C2C8",
    },
});