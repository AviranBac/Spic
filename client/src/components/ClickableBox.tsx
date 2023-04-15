import {Button, TouchableOpacity, View} from "react-native";
import styled from "styled-components/native";
import TextToSpeechIcon from "./icons/TextToSpeechIcon";
import {selectGender} from "../store/auth/auth.selectors";
import {useAppSelector} from "../store/hooks";
import {FavoriteIcon} from "./icons/FavoriteIcon";

interface ClickableBoxProps {
    name: string,
    itemId: string,
    imageUrl: string;
    onPress?: () => void;
    hasTtsIcon?: boolean;
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
                                 name, itemId, imageUrl, onPress = () => {
    }, hasTtsIcon = true
                             }: ClickableBoxProps) => {
    const userGender = useAppSelector(selectGender);

    return (
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <RelativeView>
                {hasTtsIcon &&
                    <TextToSpeechIcon text={name}
                                      gender={userGender!}
                                      style={{position: 'absolute', top: 3, left: 6, zIndex: 1}}/>
                }
                {
                hasTtsIcon &&
                <View style={{position: 'absolute', top: 3, right: 6, zIndex: 1}}>
                    <FavoriteIcon key={itemId} itemId={itemId}/>
                </View>
            }
                <TouchableOpacity onPress={onPress}>
                    <StyledImage source={{uri: imageUrl}}/>
                    <Button title={name} onPress={onPress}/>
                </TouchableOpacity>
            </RelativeView>
        </View>
    )
}