import {BaseToast, BaseToastProps, ErrorToast} from "react-native-toast-message";
import React from "react";

export const toastConfig = {
    success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
        <BaseToast
            {...props}
            style={{borderLeftColor: '#2196f3'}}
            contentContainerStyle={{paddingHorizontal: 15}}
            text1Style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center'
            }}
            text2Style={{
                fontSize: 15,
                textAlign: 'center'
            }}
        />
    ),

    error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center'
            }}
            text2Style={{
                fontSize: 15,
                textAlign: 'center'
            }}
        />
    ),
};
