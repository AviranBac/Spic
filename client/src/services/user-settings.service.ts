import axiosInstance from "./axios.service";
import { Gender } from "../store/user-details/user-details.model";

export interface UserDetails {
    email: string;
    username: string;
    gender: Gender | undefined;
    age: number;
}

export const updateUserDetails = (data: Partial<UserDetails>): Promise<UserDetails> => {
    return axiosInstance.post('/user/', data)
        .then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
        });
}

export const getUserDetails = (): Promise<UserDetails> => {
    return axiosInstance.get('/user/')
        .then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
        });
}