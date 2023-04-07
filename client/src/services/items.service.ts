import axiosInstance from './axios.service';
import { Item } from "../models/item";

export const getItems = (categoryId: string, email: string) => {
    return axiosInstance.get(`/items/${categoryId}`)
        .then((response) => response.data)
        .catch(console.error);
}

export const recordItemChosen = (item: Item, email: string) => {
    return axiosInstance.post(`/items/record`, {
        itemId: item._id,
        email,
        requestTime: new Date()
    })
        .then((response) => response.data);
}