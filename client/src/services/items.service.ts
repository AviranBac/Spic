import axiosInstance from './axios.service';

export const getItems = (categoryId: string, email: string) => {
    return axiosInstance.get(`/items/${categoryId}/${email}`)
        .then((response) => response.data)
        .catch(console.error);
}