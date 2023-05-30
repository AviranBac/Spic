import {Button, TouchableOpacity, View} from "react-native";
import styled from "styled-components/native";
import TextToSpeechIcon from "./Icons/TextToSpeechIcon";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectGender} from "../store/user-details/user-details.selectors";
import {Gender} from "../store/user-details/user-details.model";
import {GenericIcon, ICON_COLORS, ICON_TYPES} from "./Icons/GenericIcon/GenericIcon";
import {selectFavoriteIds} from "../store/favorites/favorites.selectors";
import {ActionType, updateFavorites} from "../services/favorites.service";
import {upsertFavoritesThunk} from "../store/favorites/favorites.slice";

interface ClickableBoxProps {
    name: string,
    id: string,
    imageUrl: string;
    onPress?: () => void;
    hasIcon?: boolean;
    isEditMode?: boolean;
    onDeletePress?: (itemId: string) => void;
    onEditPress?: (itemId: string, imageUri: string, itemName: string) => void;
}

const RelativeView = styled.View`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const StyledImage = styled.Image`
  width: 150px;
  height: 150px;
`;

export const ClickableBox = ({
                                 name, id, imageUrl, onPress = () => {},
                                 hasIcon = true, isEditMode = false,
                                 onDeletePress = () => {},
                                 onEditPress = () => {}
                             }: ClickableBoxProps) => {
    const userGender = useAppSelector(selectGender);
    const favorites = useAppSelector(selectFavoriteIds);
    const dispatch = useAppDispatch();

    const handleOnFavoritePress = async () => {
        const action: ActionType = favorites?.includes(id) ? 'REMOVE' : 'ADD';
        const orderedFavoriteIds: string[] = await updateFavorites({itemId: id, action})
        dispatch(upsertFavoritesThunk(orderedFavoriteIds));
    }


    const handleDeletePress = () => {
            onDeletePress(id)
    }

    const handleEditPress = () => {
            onEditPress(id, imageUrl, name);
    }

    return (
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <RelativeView style={{backgroundColor: '#f2f2f2'}}>
                {hasIcon && (
                    !isEditMode ? (
                        <>
                            <TextToSpeechIcon text={name}
                                              gender={userGender as Gender}
                                              style={{position: 'absolute', top: 3, left: 6, zIndex: 1}}/>

                            <GenericIcon key={id} onPress={handleOnFavoritePress}
                                         iconColor={favorites?.includes(id) ? ICON_COLORS.FAVORITE_ON : ICON_COLORS.FAVORITE_OFF}
                                         iconType={ICON_TYPES.FAVORITE}/>

                        </>
                    ) : <>
                        <GenericIcon key={id} onPress={handleDeletePress} iconColor={ICON_COLORS.DELETE}
                                     iconType={ICON_TYPES.DELETE}/>

                        <GenericIcon key={id} onPress={handleEditPress} iconColor={ICON_COLORS.EDIT}
                                     iconType={ICON_TYPES.EDIT}/>
                    </>)
                }
                <TouchableOpacity onPress={onPress}>
                    <StyledImage source={{uri: imageUrl}}/>
                    <Button title={name} onPress={onPress}/>
                </TouchableOpacity>
            </RelativeView>
        </View>
    )
}