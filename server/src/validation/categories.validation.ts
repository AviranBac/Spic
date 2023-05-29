import { body } from "express-validator/check";
import { getAllCategoryIds } from "../db/dal/categories.dal";
import { isEqual, sortBy } from "lodash";

export const validateCategoriesOrderRequest = () => {
    return [
        body('orderedCategoryIds', 'Invalid orderedCategoryIds')
            .isArray()
            .custom(async (orderedCategoryIds: string[]) => {
                const allCategoryIds: string[] = (await getAllCategoryIds()).map(id => id.toString());
                if (isEqual(sortBy(orderedCategoryIds), sortBy(allCategoryIds))) {
                    return true;
                }

                throw new Error(`orderedCategoryIds does not match categoryIds in DB. orderedCategoryIds: ${orderedCategoryIds}, categoryIds: ${allCategoryIds}`);
            })
    ];
};