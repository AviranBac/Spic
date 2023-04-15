import axiosInstance from "./axios.service";

export interface UserDetails {
    username:string;
    gender: string;
    age: string;
}

export const updateUserDetails = (data: Partial<UserDetails>) => {
    return axiosInstance.post('/user/', data)
        .then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
        });
}

export const getUserDetails = () => {
    return axiosInstance.get('/user/')
        .then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
        });
}