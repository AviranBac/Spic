import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import {StyledText} from "../../screens/HomeScreen/styles";

interface Props {
    isEditMode: boolean;
    onChange: (prop: boolean) => void;
}

export const EditRemoveSwitch = ({isEditMode, onChange}: Props) => {
    return (
        <View style={styles.container}>
            <Switch
                trackColor={{false: '#767577', true: '#C7F5FEFF'}}
                thumbColor={isEditMode ? '#2196f3' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onChange}
                value={isEditMode}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});