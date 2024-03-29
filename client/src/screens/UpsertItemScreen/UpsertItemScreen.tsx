import {
    Image,
    NativeSyntheticEvent,
    ScrollView,
    TextInputChangeEventData,
    TouchableOpacity,
    View
} from "react-native";
import React, { useState } from "react";
import axiosInstance from "../../services/axios.service";
import {
    ContentWrapper,
    ImageListWrapper,
    SelectedImageWrapper,
    StyledButton,
    StyledImage,
    StyledText,
    StyledTextInput,
    UpsertItemScreenWrapper
} from "./styles";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/navigation-stack";
import Toast from "react-native-toast-message";
import PopUpMenu from "../../components/PopUpMenu";
import Spinner from 'react-native-loading-spinner-overlay';
import { selectEmail } from "../../store/user-details/user-details.selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editItem } from "../../services/items.service";
import { ItemWithCategory } from "../../models/item";
import { getFavorites } from "../../services/favorites.service";
import { upsertFavoritesThunk } from "../../store/favorites/favorites.slice";

export const defaultColor = '#2196f3';
type UpsertItemScreenProps = StackScreenProps<HomeStackParamList, 'UpsertItem'>;

export const UpsertItemScreen = ({navigation, route}: UpsertItemScreenProps) => {
    const dispatch = useAppDispatch();
    const {_id, name} = route.params.category;
    const {itemName, imageUrl, itemId} = route.params;
    const category = name;
    const categoryId = _id;
    const [newItemName, setNewItemName] = useState<string>('');
    const [editItemName, setEditItemName] = useState<string>('');
    const [searchItem, setSearchItem] = useState<string>('');
    const [image, setImage] = useState<string>(imageUrl || '');
    const [imagesList, setImagesList] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const email: string | undefined = useAppSelector(selectEmail);
    const needToSearch =
        itemId
            ? editItemName === '' &&
            editItemName === newItemName &&
            (image === '' || image === imageUrl)
            : image === '';

    const needToSave = itemId ? true : newItemName !== '';
    const handleItemNameChanged = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        itemId ? setEditItemName(e.nativeEvent.text) : setNewItemName(e.nativeEvent.text);
    }

    const handleSearchItemChanged = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setSearchItem(e.nativeEvent.text);
    }

    const handleClearChanges = () => {
        setEditItemName('');
        setSearchItem('');
        setImage(imageUrl || '')
    }

    const handleOnPress = () => {
        setImage('');
        setImagesList([]);
        return axiosInstance.get(`/photos/${searchItem}`)
            .then((response) => setImagesList(response.data))
            .catch(() => Toast.show({
                type: 'error',
                text1: 'החיפוש נכשל',
                text2: 'חיפוש התמונה נכשל - אנא נסה שוב ⛔️',
            }));
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
        } else if (!itemId && newItemName === '') {
            alert('בבקשה בחר שם לפריט');
        }

        setLoading(true);

        try {
            const imageUrl = image.startsWith('file') ? await uploadImageToS3() : image;
            if (itemId) {
                await editItem(itemId, categoryId, imageUrl, editItemName || itemName || '');
            } else {
                await axiosInstance.post('/items/', {name: newItemName, imageUrl, categoryId});
            }
        } catch (error) {
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: 'השמירה נכשלה',
                text2: `הפרטים שהזנת לא נשמרו במערכת ⛔️ֿ`,
            });
            console.log(error);
            return
        }

        setLoading(false);

        const fetchData = async () => {
            const favorites: ItemWithCategory[] = await getFavorites();
            const filteredFavorites: string[] = favorites?.map((item: { _id: string; }) => item._id);
            dispatch(upsertFavoritesThunk(filteredFavorites));
        };
        fetchData();

        Toast.show({
            type: 'success',
            text1: itemId ? 'הפריט עודכן בהצלחה' : 'הפריט נשמר בהצלחה',
            text2: itemId ? 'הפריט שעדכנת נשמר במערכת ⭐️' : 'הפריט שהוספת נשמר במערכת ⭐️',
        });
        navigation.pop();
    };

    return (
        <ScrollView>
            <UpsertItemScreenWrapper>
                <ContentWrapper style={{direction: "rtl"}}>
                    {itemId ? <>
                            <StyledText style={{paddingBottom: 25}}>עריכת הפריט: {itemName}</StyledText>
                            <StyledImage source={{uri: imageUrl}}/>
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
                            {needToSave && <StyledButton title={'שמור'} onPress={handleSave}/>}
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
                {
                    imagesList.length > 0 && image === '' &&
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
            </UpsertItemScreenWrapper>
        </ScrollView>
    )
}