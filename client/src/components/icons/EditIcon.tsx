import {TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {IconsStyles} from "./FavoriteIcon";

interface Props {
    backgroundColor?: string;
    onEditPress: () => void;
}

export const EditIcon = ({onEditPress, backgroundColor = '#f2f2f2'}: Props) => {

    return (
        <View style={{position: 'absolute', top: 2, right: 1, zIndex: 1}}>
            <TouchableOpacity onPress={onEditPress}>
                <View style={{...IconsStyles.iconCircleWrapper, backgroundColor}}>
                    <View style={IconsStyles.iconCirclePaper}/>
                    <MaterialCommunityIcons name="circle-edit-outline" color={'black'}
                                            size={30}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}