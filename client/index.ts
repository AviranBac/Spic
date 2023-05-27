import registerRootComponent from 'expo/build/launch/registerRootComponent';
import RootComponent from "./src/RootComponent";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);
registerRootComponent(RootComponent);