import {StyleSheet} from "react-native";
import styled from 'styled-components/native';

export const Header = styled.View`
  background-color: #00BFFF;
  height: 200px;
`;

export const Avatar = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 63px;
  border-width: 4px;
  border-color: white;
  margin-bottom: 10px;
  align-self: center;
  position: absolute;
  margin-top: 130px;
`;

export const Body = styled.View`
  margin-top: 40px;
`;

export const BodyContent = styled.View`
  justify-content: center;
  gap: 30px;
  align-items: center;
  padding: 30px;
`;

export const Info = styled.Text`
  font-size: 16px;
  color: #00BFFF;
  margin-top: 10px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #696969;
  margin-top: 10px;
  text-align: center;
`;
export const styles = StyleSheet.create({
    dropDown: {
        width: 200,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        borderRadius: 5
    },
})
