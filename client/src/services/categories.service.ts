import axiosInstance from './axios.service';

export const getCategories = () => {
    return axiosInstance.get(`/categories`)
        .then(response => response.data)
        .catch(console.error);
}

export const updateCategoryItemListOrder = (data: any) => {
    axiosInstance.post('/categories/update', data).then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
        });
}