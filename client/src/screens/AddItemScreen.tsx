import {NativeSyntheticEvent, ScrollView, TextInputChangeEventData, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import axiosInstance from "../services/axios.service";
import {
    AddItemScreenWrapper,
    ContentWrapper,
    ImageListWrapper,
    SelectedImageWrapper,
    StyledButton,
    StyledImage,
    StyledText,
    StyledTextInput
} from "../styles/AddItemScreenStyles";

interface RouteProps {
    route: {
        params: {
            category: {
                name: string
            }
        }
    }
}

const defaultColor = '#2196f3';

export const AddItemScreen = ({route}: RouteProps) => {

    const category = route?.params?.category.name;
    const [itemName, setItemName] = useState<string>('');
    const [searchItem, setSearchItem] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [imagesList, setImagesList] = useState<string[]>([]);

    const handleItemNameChanged = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setItemName(e.nativeEvent.text);
    }

    const handleSearchItemChanged = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setSearchItem(e.nativeEvent.text);
    }

    const handleOnPress = () => {
        setImage('');
        return axiosInstance.get(`/photos/${searchItem}`)
            .then((response) => setImagesList(response.data))
            .catch(console.error);
    };

    const handleSave = () => {
        console.log('save')
    };

    return (
        <ScrollView>
            <AddItemScreenWrapper>
                <ContentWrapper style={{direction: "rtl"}}>
                    <StyledText>הוספת פריט בנושא {category}</StyledText>
                    <StyledTextInput label={'שם פריט'} variant="outlined" color={defaultColor}
                                     value={itemName}
                                     onChange={handleItemNameChanged}/>
                    <StyledTextInput label={'חפש תמונה'} variant="outlined" color={defaultColor}
                                     value={searchItem}
                                     onChange={handleSearchItemChanged}/>

                    {image === '' ?
                        <StyledButton title={'חפש'} onPress={handleOnPress}/> :
                        <View style={{gap: 20}}>
                            <StyledButton title={'שמור'} onPress={handleSave}/>
                            <StyledButton title={'חפש שוב'} onPress={handleOnPress}/>
                        </View>
                    }
                </ContentWrapper>
                {imagesList.length > 0 && image === '' &&
                    <View>
                        <StyledText>בחר תמונה:</StyledText>
                    </View> &&
                    <ImageListWrapper>
                        {imagesList.map((item, index) =>
                            <TouchableOpacity onPress={() => setImage(item)} key={index}>
                                <StyledImage source={{uri: item}}/>
                            </TouchableOpacity>)}
                    </ImageListWrapper>
                }
                {
                    image !== '' && <SelectedImageWrapper>
                        <StyledText>התמונה שנבחרה:</StyledText>
                        <StyledImage source={{uri: image}}/>
                    </SelectedImageWrapper>
                }
            </AddItemScreenWrapper>
        </ScrollView>
    )
}