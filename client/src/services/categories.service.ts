import axiosInstance from './axios.service';

export const getCategories = () => {
    return axiosInstance.get(`/categories`)
        .then(response => response.data)
        .catch(console.error);
}

export const updateCategoryListOrder = (orderedCategoryIds: string[]) => {
    return axiosInstance.put('/categories/order', {orderedCategoryIds}).then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
        });
}