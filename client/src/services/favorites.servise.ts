import axiosInstance from "./axios.service";

export const getFavorites = () => {
    return axiosInstance.get(`/favorites/`)
        .then((response) => response.data)
        .catch(console.error);
}

export const updateFavorites = (data: { itemId: string, action: string }) => {
    return axiosInstance.post('/favorites/', data)
        .then(response => {
            console.log('Response:', response.data);
            return response.data
        })
        .catch(error => {
            console.error('Error:', error);
        });
}