import React, {useRef, useState} from 'react'
import {View} from 'react-native'
import {DisabledTextInput, StyledButton, StyledTextInput} from "../../styles/shared-styles";
import {Dropdown} from "react-native-element-dropdown";
import {Gender} from "../../store/auth/auth.model";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectEmail} from "../../store/auth/auth.selectors";
import {Avatar, Body, BodyContent, Header, styles} from "./styles";
import {updateUserDetails} from "../../services/user-settiings.service";
import {selectAge, selectGender, selectUsername} from "../../store/user-details/user-details.selectors";
import {updateUserDetailsThunk} from "../../store/user-details/user-details.slice";

const data = [
    {label: 'זכר', value: Gender.MALE},
    {label: 'נקבה', value: Gender.FEMALE}
];

const defaultColor = '#2196f3';
const femaleUrl = 'https://bootdey.com/img/Content/avatar/avatar8.png';
const maleUrl = 'https://bootdey.com/img/Content/avatar/avatar6.png';
export const SettingsScreen = () => {

    const defaultValues = useRef({
        username: useAppSelector(selectUsername),
        gender: useAppSelector(selectGender),
        age: useAppSelector(selectAge)
    });

    const [username, setUsername] = useState(defaultValues.current.username);
    const [gender, setGender] = useState(defaultValues.current.gender);
    const [age, setAge] = useState(defaultValues.current.age);
    const mail = useRef(useAppSelector(selectEmail));
    const avatar = gender === Gender.FEMALE ? femaleUrl : maleUrl;
    const dispatch = useAppDispatch();
    const handleCancel = () => {
        setUsername(defaultValues.current.username);
        setGender(defaultValues.current.gender);
        setAge(defaultValues.current.age);
    }

    const handleSave = async () => {
        await updateUserDetails({username, gender, age});
        dispatch(updateUserDetailsThunk({username, gender, age}));
    }

    return (
        <View style={{direction: 'rtl'}}>
            <Header/>
            <Avatar
                source={{uri: avatar}}
            />
            <Body>
                <BodyContent>
                    <DisabledTextInput label={'מייל'} variant="outlined" color={defaultColor} editable={false}
                                       value={mail.current}/>
                    <StyledTextInput label={'שם משתמש'} variant="outlined" color={defaultColor}
                                     value={username} onChange={(e) => setUsername(e.nativeEvent.text)}/>
                    <StyledTextInput label={'גיל'} variant="outlined" color={defaultColor}
                                     value={age && age.toString()} onChange={(e) => setAge(e.nativeEvent.text)}/>
                    <Dropdown style={styles.dropDown} data={data} labelField="label"
                              itemTextStyle={{textAlign: 'center'}}
                              value={gender}
                              valueField="value" onChange={(e) => setGender(e.value)}/>

                    <StyledButton title={'שמור'} onPress={handleSave}/>
                    <StyledButton title={'ביטול'} onPress={handleCancel}/>
                </BodyContent>
            </Body>
        </View>
    )
}