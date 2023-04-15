import {Gender} from "../auth/auth.model";

export interface UserDetailsState {
    username: string;
    gender: Gender;
    age: string;
}