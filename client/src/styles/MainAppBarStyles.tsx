import styled from "styled-components/native";
import {Image, Platform} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {AppBar} from "@react-native-material/core";

export const Wrapper = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ImageWrapper = styled.View`
  flex: 1;
`;

export const StyledImage = styled(Image)`
  height: 35px;
  width: 125px;
`;

export const StyledIcon = styled(MaterialCommunityIcons)`
  flex: 0 0 10%;
`;

export const StyledAppBar = styled(AppBar)`
  background-color: rgb(199, 245, 254);
  padding-top: ${() => (Platform.OS === 'ios' ? '40px' : '0')};
  flex-direction: row;
  align-items: center;
`;
