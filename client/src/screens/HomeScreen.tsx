import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axiosInstance from "../services/axios.service";
import { useAppDispatch } from "../store/hooks";
import { logoutThunk } from "../store/auth/auth.slice";

export const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const onSignOutPress = async () => {
    dispatch(logoutThunk());
  };

  const onRefreshPress = () => {
    axiosInstance.get("/").then((res) => console.log('Refreshing..'));
  };

  return (
    <>
      <View>
        <TouchableOpacity style={styles.btn} onPress={onRefreshPress}>
          <Text>רענן</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onSignOutPress}>
          <Text>התנתק</Text>
        </TouchableOpacity>
      </View>
    </>
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
    backgroundColor: "#A9C2C8",
  },
});

