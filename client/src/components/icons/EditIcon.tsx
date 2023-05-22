import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ActionType, updateFavorites} from "../../services/favorites.service";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectFavoriteIds} from "../../store/favorites/favorites.selectors";
import {upsertFavoritesThunk} from "../../store/favorites/favorites.slice";

interface Props {
    itemId: string
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
        backgroundColor: "white",
        zIndex: -1,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 50,
        transform: [{rotate: "45deg"}],
        justifyContent: "center",
        alignItems: "center",
    },
});
export const EditIcon = ({itemId}: Props) => {

    const handleOnPress = async () => {

    }

    return (
        <View style={{position: 'absolute', top: 2, right: 6 ,zIndex:1}}>
            <TouchableOpacity onPress={handleOnPress}>
                <View style={IconsStyles.iconCircleWrapper}>
                    <View style={IconsStyles.iconCirclePaper}/>
                    <MaterialCommunityIcons name="pencil" color={'black'}
                                            size={28}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}