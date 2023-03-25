import {Button, TouchableOpacity, View} from "react-native";
import styled from "styled-components/native";

interface ClickableBoxProps {
    categoryName: string,
    imageUrl: string;
}

const Wrapper = styled.View`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.Image`
  width: 150px;
  height: 150px;
`;

export const ClickableBox = ({categoryName, imageUrl}: ClickableBoxProps) => {
    return (
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <View style={{backgroundColor: '#fff', borderRadius: 10, padding: 20}}>
                <TouchableOpacity>
                    <StyledImage source={{uri: imageUrl}}/>
                    <Button title={categoryName}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}