import { useAppSelector } from "../store/hooks";
import { selectGender } from "../store/user-details/user-details.selectors";
import { Category } from "../models/category";
import { Gender } from "../store/user-details/user-details.model";
import { useEffect, useState } from "react";

export interface UseSentenceBeginningOutput {
    sentenceBeginning: string,
    loaded: boolean
}

const useSentenceBeginning = (category?: Category): UseSentenceBeginningOutput => {
    const gender = useAppSelector(selectGender);
    const [sentenceBeginning, setSentenceBeginning] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (category) {
            const genderedSentenceBeginning: string = gender === Gender.FEMALE ?
                category.sentenceBeginning
                    .replace('רוצה', 'רוֹצָה')
                    .replace('מרגיש', 'מרגישה') :
                category.sentenceBeginning
                    .replace('רוצה', 'רוֹצֶה');

            setSentenceBeginning(genderedSentenceBeginning);
            setLoaded(true);
        } else {
            setLoaded(false);
        }
    }, [category, gender]);

    return {sentenceBeginning, loaded};
};

export default useSentenceBeginning;