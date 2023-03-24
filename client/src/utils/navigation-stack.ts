import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
    Home: {},
    Login: {},
    Register: {}
};
export const Stack = createStackNavigator<RootStackParamList>();