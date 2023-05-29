import styled from "styled-components/native";
import {Button, TextInput} from "@react-native-material/core";
import {Image, Platform, Text} from "react-native";

export const AddItemScreenWrapper = styled.View`
  flex: 1;
  padding-top: ${() => (Platform.OS === 'ios' ? '50px' : '550px')};
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper = styled.View`
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 10px;
  padding: 30px;
  width: 80%;
`;

export const StyledTextInput = styled(TextInput)`
  margin: 15px;
  width: 60%;
`;

export const ImageListWrapper = styled.View`
  padding: 20px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  border-width: 1px;
  border-radius: 10px;
  width: 80%;
`;

export const SelectedImageWrapper = styled.View`
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 10px;
  padding: 20px;
  gap: 10px;
`;

export const StyledImage = styled(Image)`
  width: 150px;
  height: 150px;
`;

export const StyledText = styled(Text)`
  font-size: 25px;
`;

export const StyledButton = styled(Button)`
  color: white;
  background-color: #2196f3;
`;