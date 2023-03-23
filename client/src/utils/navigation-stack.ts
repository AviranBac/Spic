import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
    Home: {},
    SignIn: {},
    SignUp: {}
};
export const Stack = createStackNavigator<RootStackParamList>();