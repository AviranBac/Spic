import {Image, NativeSyntheticEvent, ScrollView, TextInputChangeEventData, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import axiosInstance from "../../services/axios.service";
import {
    AddItemScreenWrapper,
    ContentWrapper,
    ImageListWrapper,
    SelectedImageWrapper,
    StyledButton,
    StyledImage,
    StyledText,
    StyledTextInput
} from "./styles";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../../utils/navigation-stack";
import Toast from "react-native-toast-message";
import PopUpMenu from "../../components/PopUpMenu";
import Spinner from 'react-native-loading-spinner-overlay';
import {selectEmail} from "../../store/user-details/user-details.selectors";
import {useAppSelector} from "../../store/hooks";
import {editItem} from "../../services/items.service";

export const defaultColor = '#2196f3';
type AddItemScreenProps = StackScreenProps<HomeStackParamList, 'AddItem'>;

export const AddItemScreen = ({navigation, route}: AddItemScreenProps) => {
    const {_id, name} = route.params.category;
    const {itemName, imageUri, itemId} = route.params;
    const category = name;
    const categoryId = _id;
    const [newItemName, setNewItemName] = useState<string>('');
    const [editItemName, setEditItemName] = useState<string>('');
    const [searchItem, setSearchItem] = useState<string>('');
    const [image, setImage] = useState<string>(imageUri || '');
    const [imagesList, setImagesList] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const email: string | undefined = useAppSelector(selectEmail);
    const needToSearch = itemId ? editItemName === '' && editItemName === newItemName && image === '' || image === imageUri && editItemName === newItemName : image === '';
    const handleItemNameChanged = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        itemId ? setEditItemName(e.nativeEvent.text) : setNewItemName(e.nativeEvent.text);
    }

    const handleSearchItemChanged = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setSearchItem(e.nativeEvent.text);
    }

    const handleClearChanges = () => {
        setEditItemName('');
        setSearchItem('');
        setImage(imageUri || '')
    }

    const handleOnPress = () => {
        setImage('');
        setImagesList([]);
        return axiosInstance.get(`/photos/${searchItem}`)
            .then((response) => setImagesList(response.data))
            .catch(console.error);
    };

    const uploadImageToS3 = async () => {
        const imageType = image.split('.')[1];
        const imageName = `s3-${email}-${Date.now()}.${imageType}`;
        const response = await axiosInstance.post('/photos/upload/', {imageName});
        const img = await fetch(image);
        const blob = await img.blob();
        await fetch(response.data.url, {
            method: "PUT",
            body: blob,
        });
        return imageName;
    }

    const handleSave = async () => {
        if (!image) {
            alert('בבקשה בחר תמונה');
            return;
        }
        setLoading(true);

        try {
            const imageUrl = image.startsWith('file') ? await uploadImageToS3() : image;
            if (itemId) {
                await editItem(itemId, categoryId, imageUrl, editItemName).catch(console.log);
            } else {
                await axiosInstance.post('/items/', {name: newItemName, imageUrl, categoryId});
            }
        } catch (error) {
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: 'השמירה נכשלה',
                text2: 'הפרטים שהזנת לא נשמרו במערכת ⛔️',
            });
            console.log(error);
        }

        setLoading(false);
        Toast.show({
            type: 'success',
            text1: itemId ? 'הפריט עודכן בהצלחה' : 'הפריט נשמר בהצלחה',
            text2: itemId ? 'הפריט שעדכנת נשמר במערכת ⭐️' : 'הפריט שהוספת נשמר במערכת ⭐️',
        });
        navigation.pop();
    };

    return (
        <ScrollView>
            <AddItemScreenWrapper>
                <ContentWrapper style={{direction: "rtl"}}>
                    {itemId ? <>
                            <StyledText style={{paddingBottom: 25}}>עריכת הפריט: {itemName}</StyledText>
                            <StyledImage source={{uri: imageUri}}/>
                            <StyledTextInput style={{paddingTop: 25}} label={itemName} variant="outlined"
                                             color={defaultColor}
                                             value={editItemName}
                                             onChange={handleItemNameChanged}/>
                        </> :
                        <>
                            <StyledText>הוספת פריט בנושא {category}</StyledText>
                            <StyledTextInput label={'שם פריט'} variant="outlined" color={defaultColor}
                                             value={newItemName}
                                             onChange={handleItemNameChanged}/>
                        </>
                    }

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <StyledTextInput label={itemId ? 'חפש תמונה חדשה' : 'חפש תמונה'} variant="outlined"
                                         color={defaultColor}
                                         placeholder="חפש"
                                         value={searchItem}
                                         onChange={handleSearchItemChanged}>
                        </StyledTextInput>
                        <PopUpMenu setImage={setImage}/>
                    </View>

                    {needToSearch ? searchItem !== '' && <StyledButton title={'חפש'} onPress={handleOnPress}/> :
                        <View style={{gap: 20}}>
                            <StyledButton title={'שמור'} onPress={handleSave}/>
                            {searchItem !== '' &&
                                <StyledButton title={itemId ? 'חפש תמונה חדשה' : 'חפש שוב'} onPress={handleOnPress}/>}
                            {itemId && <StyledButton title={'מחק שינויים'} onPress={handleClearChanges}/>}
                        </View>
                    }
                    <Spinner
                        visible={loading}
                        textContent={'Loading...'}
                        textStyle={{
                            color: '#FFF',
                        }}
                    />
                </ContentWrapper>
                {imagesList.length > 0 && image === '' &&
                    <>
                        <View>
                            {itemId ? <StyledText>בחר תמונה חדשה:</StyledText> :
                                <StyledText>בחר תמונה:</StyledText>}
                        </View>
                        <ImageListWrapper>
                            {imagesList.map((item, index) =>
                                <TouchableOpacity onPress={() => setImage(item)} key={index}>
                                    <StyledImage source={{uri: item}}/>
                                </TouchableOpacity>)}
                        </ImageListWrapper>
                    </>
                }
                {
                    image !== '' && <SelectedImageWrapper>
                        <StyledText>התמונה שנבחרה:</StyledText>
                        <Image source={{uri: image}} style={{width: 300, height: 300}}/>
                    </SelectedImageWrapper>
                }
            </AddItemScreenWrapper>
        </ScrollView>
    )
}