import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { registerThunk } from "../store/auth/auth.slice";
import { useAppDispatch } from "../store/hooks";

const data = [
    {label: 'זכר', value: 'male'},
    {label: 'נקבה', value: 'female'},
];

export const RegisterScreen = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = React.useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [error, setError] = useState();

    const onRegisterPress = async () => {
        const typedGender = gender as 'MALE' | 'FEMALE';
        dispatch(registerThunk({username, email, password, age, gender: typedGender}))
            .unwrap()
            .catch(setError);
    };

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/logo-spic.png")}/>
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
                        placeholder="שם משתמש"
                        placeholderTextColor="#003f5c"
                        onChangeText={(username) => setUsername(username)}
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
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="וידוא סיסמה"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(verifyPassword) => verifyPassword === password}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        keyboardType='numeric'
                        placeholder="גיל"
                        placeholderTextColor="#003f5c"
                        maxLength={3}
                        onChangeText={(age) => setAge(parseInt(age))}
                    />
                </View>
                <Dropdown
                    style={[styles.dropdown]}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'מין' : '...'}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    value={gender}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setGender(item.value);
                        setIsFocus(false);
                    }}
                />
                <TouchableOpacity style={styles.loginBtn} onPress={onRegisterPress}>
                    <Text>הירשם</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
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
        backgroundColor: "#A9C2C8",
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