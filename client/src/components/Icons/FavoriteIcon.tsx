import React from "react";
import { GenericIcon, ICON_COLORS, ICON_TYPES } from "./GenericIcon/GenericIcon";
import { ActionType, updateFavorites } from "../../services/favorites.service";
import { upsertFavoritesThunk } from "../../store/favorites/favorites.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectFavoriteIds } from "../../store/favorites/favorites.selectors";

interface Props {
    id: string
}

export const FavoriteIcon = ({id}: Props) => {
    const favorites = useAppSelector(selectFavoriteIds);
    const dispatch = useAppDispatch();

    const handleOnFavoritePress = async () => {
        const action: ActionType = favorites?.includes(id) ? 'REMOVE' : 'ADD';
        const orderedFavoriteIds: string[] = await updateFavorites({itemId: id, action})
        dispatch(upsertFavoritesThunk(orderedFavoriteIds));
    }

    return (
        <GenericIcon key={`favorites-${id}`}
                     onPress={handleOnFavoritePress}
                     iconColor={favorites?.includes(id) ? ICON_COLORS.FAVORITE_ON : ICON_COLORS.FAVORITE_OFF}
                     iconType={ICON_TYPES.FAVORITE}/>
    )
}