import axiosInstance from './axios.service';
import { Gender } from "../store/auth/auth.model";
import { Category } from "../models/category";

export const getCategories = (gender : Gender | undefined) => {
    return axiosInstance.get(`/categories`).then((response) => {
        return response.data?.map((category : Category) => {
            if (gender === Gender.FEMALE) { 
                category.sentenceBeginning = category.sentenceBeginning.replace('רוצה', 'רוֹצָה').replace('מרגיש', 'מרגישה');
            } else {
                category.sentenceBeginning = category.sentenceBeginning.replace('רוצה', 'רוֹצֶה');
            }
            return category;
        });
    }).catch(error => console.error(error));
}