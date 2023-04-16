import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Gender, UserDetailsState} from "./user-details.model";
import {UserDetails} from "../../services/user-settings.service";

const userDetailsInitialState: UserDetailsState = {
    email: '',
    username: '',
    gender: Gender.MALE,
    age: 0
}

export const updateUserDetailsThunk = createAsyncThunk<{ userDetails: UserDetails }, UserDetails>(
    'userDetails/updateUserDetails',
    async (payload, thunkApi) => {
        try {
            const userDetails = payload;
            return {userDetails};
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: userDetailsInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateUserDetailsThunk.fulfilled, (state, action) => {
            return action.payload.userDetails;
        });
    },
});

export default userDetailsSlice.reducer;