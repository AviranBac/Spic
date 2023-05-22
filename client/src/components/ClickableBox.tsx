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
    }, hasIcon = true, editMode = false
                             }: ClickableBoxProps) => {
    const userGender = useAppSelector(selectGender);

    return (
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <RelativeView>
                {hasIcon && (
                    !true ? (
                        <>
                            <TextToSpeechIcon text={name}
                                              gender={userGender as Gender}
                                              style={{position: 'absolute', top: 3, left: 6, zIndex: 1}}/>

                            <View style={{position: 'absolute', top: 3, right: 6, zIndex: 1}}>
                                <FavoriteIcon key={id} itemId={id}/>
                            </View>
                        </>
                    ) : <>

                        <DeleteIcon itemId={id}/>

                        <View style={{position: 'absolute', top: 3, right: 6, zIndex: 1}}>
                            <EditIcon key={id} itemId={id}/>
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