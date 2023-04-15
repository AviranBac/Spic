import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {FavoritesState} from "./favorites.model";

const favoritesInitialState: FavoritesState = {
    favoriteIds: []
}

export const upsertFavoritesThunk = createAsyncThunk<{ favorites: string[] }, string[]>(
    'favorites/addFavorite',
    async (payload, thunkApi) => {
        try {
            const favorites = payload;
            return { favorites };
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
                state.favoriteIds = action.payload.favorites;
            });
    },
});

export default favoritesSlice.reducer;