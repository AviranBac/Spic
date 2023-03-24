import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";
import { AuthState, IUserSession } from "./auth.model";

export const loginThunk = createAsyncThunk<{ userSession: IUserSession }, { email: string, password: string }>(
    'auth/login',
    async (payload, thunkApi) => {
        try {
            const {email, password} = payload;
            const userSession = await AuthService.login(email, password);
            return {userSession};
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const registerThunk = createAsyncThunk<{ userSession: IUserSession }, { username: string, email: string, password: string, age: number, gender: 'MALE' | 'FEMALE' }>(
    'auth/register',
    async (payload, thunkApi) => {
        try {
            const {username, email, password, age, gender} = payload;
            const userSession = await AuthService.register(username, email, password, age, gender);
            console.log(userSession);
            return {userSession};
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async () => {
        await AuthService.logout();
    }
);

const initialState: AuthState = {userSession: null};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.userSession = action.payload.userSession;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.userSession = action.payload.userSession;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.userSession = null;
            })
            .addCase(logoutThunk.rejected, (state) => {
                state.userSession = null;
            })
    }
});

export default authSlice.reducer;