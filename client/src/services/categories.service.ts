import axiosInstance from './axios.service';

export const getCategories = () => {
    return axiosInstance.get(`/categories`)
        .then((response) => response.data)
        .catch(console.error);
}