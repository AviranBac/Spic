import axiosInstance from "./axios.service";

export const getFavorites = () => {
    return axiosInstance.get(`/favorites/`)
        .then((response) => response.data)
        .catch(console.error);
}
export type ActionType = 'ADD' | 'REMOVE';

export const updateFavorites = (data: { itemId: string, action: ActionType }) => {
    return axiosInstance.post('/favorites/', data)
        .then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
        });
}