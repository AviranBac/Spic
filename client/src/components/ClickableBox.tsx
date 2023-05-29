import {Button, TouchableOpacity, View} from "react-native";
import styled from "styled-components/native";
import TextToSpeechIcon from "./icons/TextToSpeechIcon";
import {useAppSelector} from "../store/hooks";
import {FavoriteIcon} from "./icons/FavoriteIcon";
import {selectGender} from "../store/user-details/user-details.selectors";
import {Gender} from "../store/user-details/user-details.model";
import {DeleteIcon} from "./icons/DeleteIcon";
import {EditIcon} from "./icons/EditIcon";

interface ClickableBoxProps {
    name: string,
    id: string,
    imageUrl: string;
    onPress?: () => void;
    hasIcon?: boolean;
    editMode?: boolean;
    onDeletePress?: (itemId: string) => void;
    onEditPress?: (itemId: string, imageUri:string, itemName:string) => void;
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
                                 name, id, imageUrl, onPress = () => {
    }, hasIcon = true, editMode = false, onDeletePress, onEditPress
                             }: ClickableBoxProps) => {
    const userGender = useAppSelector(selectGender);

    const handleDeletePress = () => {
        if (onDeletePress) {
            onDeletePress(id)
        }
    }

    const handleEditPress = () => {
        if (onEditPress) {
            onEditPress(id, imageUrl, name);
        }
    }

    return (
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <RelativeView style={{backgroundColor: '#f2f2f2'}}>
                {hasIcon && (
                    !editMode ? (
                        <>
                            <TextToSpeechIcon text={name}
                                              gender={userGender as Gender}
                                              style={{position: 'absolute', top: 3, left: 6, zIndex: 1}}/>

                            <View style={{position: 'absolute', top: 3, right: 1, zIndex: 1}}>
                                <FavoriteIcon key={id} itemId={id}/>
                            </View>
                        </>
                    ) : <>

                        <DeleteIcon itemId={id} onDeletePress={handleDeletePress}/>

                        <View style={{position: 'absolute', top: 3, right: 6, zIndex: 1}}>
                            <EditIcon key={id} onEditPress={handleEditPress}/>
                        </View>
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