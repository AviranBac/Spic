import React, { FC, useContext } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import api from "../services/api";
import { SessionContext, IContextType } from "../App";
import AuthService from "../services/auth.service";

export const HomeScreen = () => {
  const context = useContext<IContextType | null>(SessionContext);

  const onSignOutPress = async () => {
    await AuthService.signOut();
    if (context !== null) context.deleteSession();
  };

  const fetchData = () => {
    api.get("/").then((res) => console.log(`response home:${JSON.stringify(res.data.status)}`)).catch((err) => {
      console.log(`error occured while fetching data: ${err}`);
      if (context !== null) context.deleteSession();
    });
  };
  fetchData();

  return (
    <>
      <View>
        <Text>
          Home
        </Text>
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

