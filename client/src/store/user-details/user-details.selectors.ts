import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {UserDetailsState} from "./user-details.model";

const selectUserDetailsState: (state: RootState) => UserDetailsState = (state: RootState) => state.userDetails;

export const selectUsername = createSelector(
    [selectUserDetailsState],
    (userDetailsState) => userDetailsState?.username
);

export const selectGender = createSelector(
    [selectUserDetailsState],
    (userDetailsState) => userDetailsState?.gender
);

export const selectAge = createSelector(
    [selectUserDetailsState],
    (userDetailsState) => userDetailsState?.age
);