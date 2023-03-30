import axiosInstance from './axios.service';

export const getCategories = () => {
    return axiosInstance.get(`/categories`).then((response) => {
        return response.data;
    }).catch(error => console.error(error));
}