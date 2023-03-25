import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAppDispatch } from "../store/hooks";
import { logoutThunk } from "../store/auth/auth.slice";

export const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const onLogoutPress = async () => {
    dispatch(logoutThunk());
  };

  return (
      <TouchableOpacity style={styles.btn} onPress={onLogoutPress}>
        <Text>התנתק</Text>
      </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  btn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#A9C2C8"
  },
});

