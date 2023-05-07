import { Text, View } from "react-native";
import React from "react";
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const PopUpMenu = ({ setImage }: { setImage: (image: string) => void }) => {

const pickImage = async () => {
    let image = '';
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");
    } else {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            image = result.assets[0].uri;
        }
    }

    return image;
};

const openCamera = async () => {
    let image = '';
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
    } else {
        const result: any = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            image = result.uri;
        }
    }

    return image;
};

    return (
        <View
            style={{
                position: 'absolute', 
                right: 0,
                width: 150,
                height: 150,
            }}
        >
            <MenuProvider>
                <Menu>
                    <MenuTrigger style={{ position: 'absolute', right: 30, top: 65}}>
                        <Ionicons name="ios-cloud-upload-outline" size={20} color="#2196f3" />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption
                            customStyles={{
                                optionWrapper: {
                                    flexDirection: "row"
                                },
                            }}
                            onSelect={async () => setImage(await openCamera())} >
                            <Ionicons name="camera" size={20} color="#2196f3" />
                            <Text> צלם תמונה</Text>
                        </MenuOption>
                        <MenuOption
                            customStyles={{
                                optionWrapper: {
                                    flexDirection: "row"
                                },
                            }}
                            onSelect={async () => setImage(await pickImage())} >
                            <Ionicons name="image" size={20} color="#2196f3" />
                            <Text> בחר תמונה מהגלריה</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </MenuProvider>
        </View>
    );
};

export default PopUpMenu;
