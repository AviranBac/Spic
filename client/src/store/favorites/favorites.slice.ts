import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FavoritesState } from "./favorites.model";

const favoritesInitialState: FavoritesState = {
    orderedFavoriteIds: []
}

export const upsertFavoritesThunk = createAsyncThunk<{ orderedFavoriteIds: string[] }, string[]>(
    'favorites/addFavorite',
    async (payload, thunkApi) => {
        try {
            const orderedFavoriteIds = payload;
            return { orderedFavoriteIds };
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response);
        }
    }
);


const favoritesSlice = createSlice({
    name: "favorites",
    initialState: favoritesInitialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(upsertFavoritesThunk.fulfilled, (state, action) => {
                state.orderedFavoriteIds = action.payload.orderedFavoriteIds;
            });
    },
});

export default favoritesSlice.reducer;