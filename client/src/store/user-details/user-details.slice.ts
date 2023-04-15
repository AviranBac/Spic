import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserDetailsState} from "./user-details.model";
import {UserDetails} from "../../services/user-settiings.service";

const userDetailsInitialState: UserDetailsState = {
    username: '',
    gender: '',
    age: ''
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
        builder
            .addCase(updateUserDetailsThunk.fulfilled, (state, action) =>
                action.payload.userDetails
            );
    },
});

export default userDetailsSlice.reducer;