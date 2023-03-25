import axios from "axios";

export const getCategories = () => {
    return axios.get('http://192.168.1.152:8080/categories').then((response) => {
        return response.data;
    }).catch(error => console.log(error));
}