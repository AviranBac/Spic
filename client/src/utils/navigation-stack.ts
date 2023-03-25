import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
    Login: {},
    Register: {}
};
export const Stack = createStackNavigator<RootStackParamList>();