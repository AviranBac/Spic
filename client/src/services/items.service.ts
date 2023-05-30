import axiosInstance from './axios.service';
import {Item} from "../models/item";

export const getItems = (categoryId: string) => {
    return axiosInstance.get(`/items/${categoryId}`)
        .then((response) => response.data)
        .catch(console.error);
}

export const getCommonlyUsedItems = () => {
    return axiosInstance.get(`/items/commonlyUsed`)
        .then((response) => response.data)
        .catch(console.error);
}

export const recordItemChosen = (item: Item, recommendedItemIds?: string[]) => {
    return axiosInstance.post(`/items/record`, {
        itemId: item._id,
        requestTime: new Date(),
        ...(recommendedItemIds && {recommendedItemIds})
    })
        .then((response) => response.data);
}

export const updateItemListOrder = (orderedItemIds: string[], categoryId: string | undefined) => {
    return axiosInstance.put('/items/order', {categoryId, orderedItemIds}).then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
        });
}

export const deleteItem = (itemId: string) => {
    return axiosInstance.delete('/items', {data: {_id: itemId}});
}
export const editItem = (itemId: string, categoryId: string, imageUrl: string, name: string) => {
    return axiosInstance.put('/items', {_id: itemId, categoryId, name, imageUrl});
}