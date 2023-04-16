import axiosInstance from "./axios.service";

export interface UserDetails {
    email:string;
    username: string;
    gender: string;
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