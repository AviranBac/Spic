import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {FavoritesState} from "./favorites.model";

const selectFavoritesState: (state: RootState) => FavoritesState = (state: RootState) => state.favorites;

export const selectFavoriteIds = createSelector(
    [selectFavoritesState],
    (favoritesState) => favoritesState?.favoriteIds
);