import React, { FormEvent, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../utils/navigation-stack";
import { loginThunk } from "../store/auth/auth.slice";
import { useAppDispatch } from "../store/hooks";
import { Formik } from "formik";
import * as yup from 'yup';
import { AxiosResponse } from "axios";

type LoginScreenProps = StackScreenProps<RootStackParamList>;
export interface LoginFormDetails {
    email: string,
    password: string
}

export const LoginScreen = ({navigation}: LoginScreenProps) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [backendHebrewError, setBackendHebrewError] = useState('');

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("הכנס אימייל תקין")
            .required("הכנס אימייל"),
        password: yup
            .string()
            .min(7, ({min}) => `הסיסמה חייבת להכיל ${min} תווים`)
            .required("הכנס סיסמה")
    });

    const translateAndSetBackendError = (error: AxiosResponse) => {
        let errorMessage: string;

        switch (error.data) {
            case 'Invalid Credentials': errorMessage = 'פרטי ההתחברות שגויים. נסה שנית'; break;
            default: errorMessage = 'אירעה שגיאה בהתחברות'; break;
        }

        setBackendHebrewError(errorMessage);
    };

    const toggleLoading = () => setIsLoading(!isLoading);

    const onLoginSubmit = async (loginFormDetails: LoginFormDetails) => {
        dispatch(loginThunk(loginFormDetails))
            .unwrap()
            .then(() => setBackendHebrewError(''))
            .catch(translateAndSetBackendError)
            .finally(toggleLoading);
    };

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/logo-spic.png")}/>
                <Formik validationSchema={loginValidationSchema}
                        initialValues={{email: '', password: ''}}
                        onSubmit={onLoginSubmit}
                        validateOnMount
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (
                        <>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="אימייל"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                            </View>
                            {errors.email && touched.email &&
                                <Text style={styles.errorText}>{errors.email}</Text>
                            }

                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="סיסמה"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                />
                            </View>
                            {errors.password && touched.password &&
                                <Text style={styles.errorText}>{errors.password}</Text>
                            }

                            <TouchableOpacity style={styles.loginBtn}
                                              onPress={(event) => {
                                                  handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
                                                  if (isValid) {
                                                      toggleLoading();
                                                  }
                                              }}
                                              disabled={!isValid}
                            >
                                {isLoading ?
                                    <ActivityIndicator size="large" color="black" /> :
                                    <Text>התחבר</Text>
                                }
                            </TouchableOpacity>
                            { backendHebrewError &&
                                <View style={styles.backendHebrewErrorContainer}>
                                    <Text style={styles.errorText}>{backendHebrewError}</Text>
                                </View>
                            }
                        </>
                    )}
                </Formik>
                <Text style={styles.forgotText}>{`אין לך משתמש? הירשם `}
                    <Text onPress={() => navigation.navigate('Register', {})}
                          style={styles.forgotLink}
                    >
                        כאן
                    </Text>
                </Text>
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
    image: {
        marginBottom: 40,
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