import axiosInstance from './axios.service';
import { store } from "../store/store";
import { Gender } from "../store/auth/auth.model";

export interface Category {
    imageUrl: string
    items: []
    name: string
    sentenceBeginning: string
    _id: string
}

export const getCategories = () => {
    return axiosInstance.get(`/categories`).then((response) => {
        return response.data.map((category : Category) => {
            const gender : Gender | undefined = store.getState().auth.userSession?.gender;
            if (gender === Gender.FEMALE) { 
                category.sentenceBeginning = category.sentenceBeginning.replace('רוצה', 'רוֹצָה').replace('מרגיש', 'מרגישה');
            } else {
                category.sentenceBeginning = category.sentenceBeginning.replace('רוצה', 'רוֹצֶה');
            }
            return category;
        });
    }).catch(error => console.error(error));
}