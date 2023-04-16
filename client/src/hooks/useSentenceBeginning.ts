import { useAppSelector } from "../store/hooks";
import { selectGender } from "../store/user-details/user-details.selectors";
import { Category } from "../models/category";
import { Gender } from "../store/user-details/user-details.model";
import { useEffect, useState } from "react";

const useSentenceBeginning = (category: Category) => {
    const gender = useAppSelector(selectGender);
    const [sentenceBeginning, setSentenceBeginning] = useState('');

    useEffect(() => {
        const genderedSentenceBeginning: string = gender === Gender.FEMALE ?
            category.sentenceBeginning
                .replace('רוצה', 'רוֹצָה')
                .replace('מרגיש', 'מרגישה') :
            category.sentenceBeginning
                .replace('רוצה', 'רוֹצֶה');

        setSentenceBeginning(genderedSentenceBeginning);
    }, [gender]);

    return sentenceBeginning;
};

export default useSentenceBeginning;