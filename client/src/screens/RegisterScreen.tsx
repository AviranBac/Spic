import { Dropdown } from 'react-native-element-dropdown';
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
import { registerThunk } from "../store/auth/auth.slice";
import { useAppDispatch } from "../store/hooks";
import * as yup from "yup";
import { AxiosResponse } from "axios/index";
import { HttpStatusCode } from "axios";
import { Formik } from "formik";
import { Gender } from "../store/auth/auth.model";

const data = [
    {label: 'זכר', value: Gender.MALE},
    {label: 'נקבה', value: Gender.FEMALE}
];

export interface RegisterFormDetails {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    age: number,
    gender: Gender
};

export const RegisterScreen = () => {
    const dispatch = useAppDispatch();
    const [isFocus, setIsFocus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [backendHebrewError, setBackendHebrewError] = useState('');

    const registerValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("הכנס אימייל תקין")
            .required("הכנס אימייל"),
        username: yup
            .string()
            .required("הכנס שם משתמש"),
        password: yup
            .string()
            .min(7, ({min}) => `הסיסמה חייבת להכיל ${min} תווים`)
            .required("הכנס סיסמה"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'הסיסמה ווידוא הסיסמה אינם זהים')
            .required("הכנס וידוא סיסמה"),
        age: yup
            .number()
            .required("הכנס גיל")
            .typeError("הכנס מספרים בלבד"),
        gender: yup
            .mixed()
            .oneOf(Object.values(Gender), "הכנס מין")
            .required("הכנס מין")
    });

    const translateAndSetBackendError = (error: AxiosResponse) => {
        let errorMessage: string;

        switch (error.status) {
            case HttpStatusCode.Conflict: errorMessage = 'אימייל זה כבר רשום במערכת. אנא התחבר או בחר מייל אחר'; break;
            default: errorMessage = 'אירעה שגיאה בהרשמה'; break;
        }

        setBackendHebrewError(errorMessage);
    };

    const toggleLoading = () => setIsLoading(!isLoading);

    const onRegisterSubmit = async (registerFormDetails: RegisterFormDetails) => {
        dispatch(registerThunk(registerFormDetails))
            .unwrap()
            .then(() => setBackendHebrewError(''))
            .catch(translateAndSetBackendError)
            .finally(toggleLoading);
    };

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/logo-spic.png")}/>
                <Formik validationSchema={registerValidationSchema}
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            age: '' as unknown as RegisterFormDetails['age'],
                            gender: '' as unknown as RegisterFormDetails['gender']
                        }}
                        onSubmit={onRegisterSubmit}
                        validateOnMount
                >
                    {({handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched, isValid}) => (
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
                                    placeholder="שם משתמש"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                />
                            </View>
                            {errors.username && touched.username &&
                                <Text style={styles.errorText}>{errors.username}</Text>
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

                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="וידוא סיסמה"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry
                                />
                            </View>
                            {errors.confirmPassword && touched.confirmPassword &&
                                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                            }

                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    keyboardType='numeric'
                                    placeholder="גיל"
                                    placeholderTextColor="#003f5c"
                                    maxLength={3}
                                    onChangeText={handleChange('age')}
                                    onBlur={handleBlur('age')}
                                    value={values.age.toString()}
                                />
                            </View>
                            {errors.age && touched.age &&
                                <Text style={styles.errorText}>{errors.age}</Text>
                            }

                            <Dropdown
                                style={[styles.dropdown]}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'מין' : '...'}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                onChange={({value}) => { setFieldValue('gender', value); setIsFocus(false); }}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => { handleBlur('gender'); setIsFocus(false); }}
                                value={values.gender.toString()}
                            />
                            {errors.gender && touched.gender &&
                                <Text style={styles.errorText}>{errors.gender}</Text>
                            }

                            <TouchableOpacity style={styles.registerBtn}
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
                                    <Text>הירשם</Text>
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