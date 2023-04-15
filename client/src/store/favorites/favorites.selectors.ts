import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {FavoritesState} from "./favorites.model";

const selectFavoritesState: (state: RootState) => FavoritesState = (state: RootState) => state.favorites;

export const selectFavorites = createSelector(
    [selectFavoritesState],
    (favoritesState) => favoritesState?.favorites
);