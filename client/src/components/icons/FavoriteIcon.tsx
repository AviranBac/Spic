import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ActionType, updateFavorites} from "../../services/favorites.service";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectFavoriteIds} from "../../store/favorites/favorites.selectors";
import {upsertFavoritesThunk} from "../../store/favorites/favorites.slice";

interface Props {
    itemId: string,
    backgroundColor?: string
}

export const IconsStyles = StyleSheet.create({
    iconCircleWrapper: {
        position: "relative",
        width: 32,
        height: 32,
        borderRadius: 50,
        overflow: "hidden",
    },
    iconCirclePaper: {
        position: "absolute",
        top: "-35%",
        left: "-35%",
        width: "170%",
        height: "170%",
        zIndex: -1,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 50,
        transform: [{rotate: "45deg"}],
        justifyContent: "center",
        alignItems: "center",
    },
});
export const FavoriteIcon = ({itemId, backgroundColor = '#f2f2f2'}: Props) => {
    const favorites = useAppSelector(selectFavoriteIds);
    const dispatch = useAppDispatch();

    const handleOnPress = async () => {
        const action: ActionType = favorites?.includes(itemId) ? 'REMOVE' : 'ADD';
        const orderedFavoriteIds: string[] = await updateFavorites({itemId, action})
        dispatch(upsertFavoritesThunk(orderedFavoriteIds));
    }

    return (
        <View style={{position: 'absolute', top: 0, right: 6}}>
            <TouchableOpacity onPress={handleOnPress}>
                <View style={{...IconsStyles.iconCircleWrapper, backgroundColor}}>
                    <View style={IconsStyles.iconCirclePaper}/>
                    <MaterialCommunityIcons name="star" color={favorites?.includes(itemId) ? '#ffde00' : 'gray'}
                                            size={32}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}