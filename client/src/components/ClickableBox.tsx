import { Button, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import TextToSpeechIcon from "./Icons/TextToSpeechIcon";
import { useAppSelector } from "../store/hooks";
import { selectGender } from "../store/user-details/user-details.selectors";
import { Gender } from "../store/user-details/user-details.model";
import { FavoriteIcon } from "./Icons/FavoriteIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";
import { EditIcon } from "./Icons/EditIcon";

interface ClickableBoxProps {
    name: string,
    id: string,
    imageUrl: string;
    onPress?: () => void;
    hasIcon?: boolean;
    isEditMode?: boolean;
    onDeletePress?: (itemId: string) => void;
    onEditPress?: (itemId: string, imageUrl: string, itemName: string) => void;
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

    return (
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <RelativeView style={{backgroundColor: '#f2f2f2'}}>
                {hasIcon && (
                    !isEditMode ? (
                        <>
                            <TextToSpeechIcon text={name}
                                              gender={userGender as Gender}
                                              style={{position: 'absolute', top: 3, left: 6, zIndex: 1}}/>
                            <FavoriteIcon id={id} />
                        </>
                    ) : <>
                        <DeleteIcon id={id} onDeletePress={onDeletePress} />
                        <EditIcon id={id} imageUrl={imageUrl} itemName={name} onEditPress={onEditPress} />
                    </>
                )}
                <TouchableOpacity onPress={onPress}>
                    <StyledImage source={{uri: imageUrl}}/>
                    <Button title={name} onPress={onPress}/>
                </TouchableOpacity>
            </RelativeView>
        </View>
    )
}