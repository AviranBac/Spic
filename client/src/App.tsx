import { StatusBar } from 'expo-status-bar';
import React, { FC, createContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthService from "./services/auth.service";
import { IUserSession } from "./services/user-session.service";
import { SignUpScreen } from "./screens/SignUpScreen";
import { SignInScreen } from "./screens/SignInScreen";
import { HomeScreen } from "./screens/HomeScreen";

export interface IContextType {
  session: IUserSession | null;
  updateSession: (session: IUserSession) => void;
  deleteSession: () => void;
};

export const SessionContext = createContext<IContextType | null>(null);

const Stack = createStackNavigator();

const App: FC = () => {
  const [session, setSession] = useState<IUserSession | null>(null);

  // Load user session data from AsyncStorage on app load
  useEffect(() => {
    const loadSession = async () => {
      const userSession = await AuthService.getCurrentUser();
      if (userSession) {
        setSession(userSession);
      }
    };
    loadSession();
  }, []);

  const updateSession = (sessionData: any) => {
    console.log(`Update Session: ${JSON.stringify(sessionData)}`);
    setSession(sessionData);
    AuthService.setCurrentUser(sessionData);
  };

  const deleteSession = () => {
    console.log(`Delete Session: ${JSON.stringify(session)}`);
    setSession(null);
    AuthService.signOut();
  };

  return (
    <>
      <SessionContext.Provider value={{ session, updateSession, deleteSession }}>
        <NavigationContainer>
          <Stack.Navigator>
            {session ? (
              <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
              <>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SessionContext.Provider>
      <StatusBar style="auto" />
    </>
  );
}

export default App;
