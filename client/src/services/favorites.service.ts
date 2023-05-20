import axiosInstance from "./axios.service";
import { ItemWithCategory } from "../models/item";

export const getFavorites: () => Promise<ItemWithCategory[]> = () => {
    return axiosInstance.get(`/favorites`)
        .then((response) => response.data)
        .catch(console.error);
}
export type ActionType = 'ADD' | 'REMOVE';

export const updateFavorites = (data: { itemId: string, action: ActionType }): Promise<string[]> => {
    return axiosInstance.post('/favorites', data)
        .then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
        });
}