import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { AuthState, IUserSession } from "./auth.model";

const selectAuthState = (state: RootState) => state.auth;

export const selectUserSession = createSelector(
    [selectAuthState],
    (authState: AuthState) => authState?.userSession
);

export const selectUsername = createSelector(
    [selectUserSession],
    (userSession: IUserSession | null) => userSession?.username
);