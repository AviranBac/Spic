import styled from "styled-components/native";
import {Button, TextInput} from "@react-native-material/core";

export const StyledButton = styled(Button)`
  color: white;
  background-color: #2196f3;
  width: 100px;
`;

export const ItemsWrapper = styled.View`
  flex: 1;
  flex-wrap: wrap;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
  gap: 40px;
`;

interface HeadLinedWrapperProps {
    wrapperSize?: number;
}

export const HeadLinedWrapper = styled.View<HeadLinedWrapperProps>`
  flex: ${props => props.wrapperSize ? `0 0 ${props.wrapperSize}%` : '0 0 10%'};
  justify-content: center;
  align-items: center;
`;

export const StyledTextInput = styled(TextInput)`
  width: 60%;
`;

export const DisabledTextInput = styled(TextInput)`
  width: 60%;
  opacity: 0.5;
`;