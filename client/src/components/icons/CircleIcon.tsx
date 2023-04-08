import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, ViewStyle } from "react-native";
import React, { ComponentProps } from "react";

const defaultStyle: (size: number) => ViewStyle = (size) => ({
    borderRadius: (size + 5 * 2) / 2,
    padding: 5,
    zIndex: 1
});

export type CircleIconProps = {
    iconColor: string,
    name: ComponentProps<typeof MaterialCommunityIcons>['name'],
    onPress: () => void,
    size: number,
    style: ViewStyle
};

export const CircleIcon = ({iconColor, name, onPress, size, style}: CircleIconProps) => (
    <Pressable style={{...defaultStyle(size), ...style}} onPress={onPress}>
        <MaterialCommunityIcons color={iconColor} name={name} size={size}/>
    </Pressable>
);

