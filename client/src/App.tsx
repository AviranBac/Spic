import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { FC } from "react";
import { LoginScreen } from "./screens/LoginScreen";
import { SignInScreen } from "./screens/SignInScreen";

const App: FC = () => {
  return (
    <>
      {/* <LoginScreen /> */}
      <SignInScreen/>
      <StatusBar style="auto" />
    </>
  );
}

export default App;
