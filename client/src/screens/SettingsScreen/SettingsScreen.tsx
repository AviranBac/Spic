import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import { DisabledTextInput, StyledButton, StyledTextInput } from "../../styles/shared-styles";
import { Dropdown } from "react-native-element-dropdown";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Avatar, Body, BodyContent, Header, styles } from "./styles";
import { updateUserDetails } from "../../services/user-settings.service";
import { selectAge, selectEmail, selectGender, selectUsername } from "../../store/user-details/user-details.selectors";
import { updateUserDetailsThunk } from "../../store/user-details/user-details.slice";
import { Gender } from "../../store/user-details/user-details.model";
import Toast from "react-native-toast-message";

const data = [
    {label: 'זכר', value: Gender.MALE},
    {label: 'נקבה', value: Gender.FEMALE}
];

const defaultColor = '#2196f3';
const femaleUrl = 'https://bootdey.com/img/Content/avatar/avatar8.png';
const maleUrl = 'https://bootdey.com/img/Content/avatar/avatar6.png';
export const SettingsScreen = () => {
    const storedUsername  = useAppSelector(selectUsername);
    const storedGender  = useAppSelector(selectGender);
    const storedAge  = useAppSelector(selectAge);

    const [username, setUsername] = useState(storedUsername);
    const [gender, setGender] = useState(storedGender);
    const [age, setAge] = useState(storedAge);
    const mail = useRef(useAppSelector(selectEmail));

    const avatar = gender === Gender.FEMALE ? femaleUrl : maleUrl;
    const dispatch = useAppDispatch();
    const handleCancel = () => {
        setUsername(storedUsername);
        setGender(storedGender)
        setAge(storedAge);
    }

    const handleSave = async () => {
        await updateUserDetails({username, gender, age});
        dispatch(updateUserDetailsThunk({email: mail.current, username, gender, age}));
        Toast.show({
            type: 'success',
            text1: 'שמירה בוצעה בהצלחה',
            text2: 'הפרטים שהזנת נשמרו במערכת ⭐️',
        });
    }

    return (
        <View style={{direction: 'rtl', flex: 1}}>
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
                    <StyledTextInput label={'גיל'} variant="outlined" color={defaultColor} keyboardType={'numeric'}
                                     value={String(age)} onChange={(e) => setAge(Number(e.nativeEvent.text))}/>
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