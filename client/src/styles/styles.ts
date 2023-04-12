import styled from "styled-components/native";
import {Button, TextInput} from "@react-native-material/core";

export const StyledButton = styled(Button)`
  color: white;
  background-color: #2196f3;
  width: 100px;
`;

export const StyledTextInput = styled(TextInput)`
  width: 60%;
`;

export const DisabledTextInput = styled(TextInput)`
  width: 60%;
  opacity: 0.5;
`;