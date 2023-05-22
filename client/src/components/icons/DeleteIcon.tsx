import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ActionType, updateFavorites} from "../../services/favorites.service";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectFavoriteIds} from "../../store/favorites/favorites.selectors";
import {upsertFavoritesThunk} from "../../store/favorites/favorites.slice";
import {IconsStyles} from "./FavoriteIcon";

interface Props {
    itemId: string
}

export const DeleteIcon = ({itemId}: Props) => {

    const handleOnPress = async () => {

    }

    return (
        <View style={{position: 'absolute', top: 2, left: 6, zIndex: 1}}>
            <TouchableOpacity onPress={handleOnPress}>
                <View style={IconsStyles.iconCircleWrapper}>
                    <View style={IconsStyles.iconCirclePaper}/>
                    <MaterialCommunityIcons name="delete" color={'red'}
                                            size={30}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}