import {TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {IconsStyles} from "./GenericIcon/styles";

interface Props {
    itemId: string;
    backgroundColor?: string;
    onDeletePress?: () => void;
}

export const DeleteIcon = ({onDeletePress, backgroundColor = '#f2f2f2'}: Props) => {
    return (
        <>
            <View style={{position: 'absolute', top: 2, left: 6, zIndex: 1}}>
                <TouchableOpacity onPress={onDeletePress}>
                    <View style={{...IconsStyles.iconCircleWrapper, backgroundColor}}>
                        <View style={IconsStyles.iconCirclePaper}/>
                        <MaterialCommunityIcons name="delete" color={'black'}
                                                size={30}/>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}