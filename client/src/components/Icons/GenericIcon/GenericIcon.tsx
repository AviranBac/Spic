import {TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {IconsStyles} from "./styles";

export enum ICON_TYPES {
    DELETE = 'delete',
    FAVORITE = 'star',
    EDIT = 'circle-edit-outline'
}

export enum ICON_COLORS {
    DELETE = 'black',
    FAVORITE_ON = '#ffde00',
    FAVORITE_OFF = 'gray',
    EDIT = 'black'
}

const ICON_POSITION = new Map<ICON_TYPES, object>([[ICON_TYPES.DELETE, {
    position: 'absolute',
    top: 2,
    left: 6,
    zIndex: 1
}], [ICON_TYPES.EDIT, {position: 'absolute', top: 2, right: 6, zIndex: 1}], [ICON_TYPES.FAVORITE, {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 6
}]])

interface Props {
    backgroundColor?: string;
    iconColor: ICON_COLORS;
    onPress?: () => void;
    iconType: ICON_TYPES
    iconSize?: number;
}

export const GenericIcon = ({onPress, backgroundColor = '#f2f2f2', iconType, iconColor, iconSize = 30}: Props) => {
    return (
        <>
            <View style={ICON_POSITION.get(iconType)}>
                <TouchableOpacity onPress={onPress}>
                    <View style={{...IconsStyles.iconCircleWrapper, backgroundColor}}>
                        <View style={IconsStyles.iconCirclePaper}/>
                        <MaterialCommunityIcons name={iconType} color={iconColor}
                                                size={iconSize}/>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}