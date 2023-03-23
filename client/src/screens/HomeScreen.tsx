import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axiosInstance from "../services/axios.service";
import { IContextType, SessionContext } from "../services/session-context.service";
import AuthService from "../services/auth.service";

export const HomeScreen = () => {
  const context = useContext<IContextType | null>(SessionContext);

  const onSignOutPress = async () => {
    await AuthService.signOut();
    if (context !== null) context.deleteSession();
  };

  const onRefreshPress = () => {
    axiosInstance.get("/").then((res) => console.log('Refreshing..')).catch((err) => {
      if (context !== null) context.deleteSession();
    });
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

