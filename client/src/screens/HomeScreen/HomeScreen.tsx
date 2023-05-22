import {ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import {getCategories, updateCategoryListOrder} from "../../services/categories.service";
import {useAppSelector} from "../../store/hooks";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../../utils/navigation-stack";
import {Category} from "../../models/category";
import {selectGender, selectUsername} from "../../store/user-details/user-details.selectors";
import {StyledText, Wrapper} from "./styles";
import {HeadLinedWrapper, ItemsWrapper} from "../../styles/shared-styles";
import {Gender} from "../../store/user-details/user-details.model";
import {DragAndDrop} from "../../components/DragAndDrop/DragAndDrop";

type HomeScreenProps = StackScreenProps<HomeStackParamList>;

enum TIME_STRINGS {
    MORNING = 'בוקר טוב',
    NOON = 'צהריים טובים',
    EVENING = 'ערב טוב',
    NIGHT = 'לילה טוב'
}

const getTimeString = () => {
    let timeString: TIME_STRINGS = TIME_STRINGS.MORNING;
    const time = new Date().getHours();

    if (time >= 21 || time < 5) {
        timeString = TIME_STRINGS.NIGHT;
    } else if (time >= 5 && time < 12) {
        timeString = TIME_STRINGS.MORNING;
    } else if (time >= 12 && time < 18) {
        timeString = TIME_STRINGS.NOON
    } else if (time >= 18 && time < 21) {
        timeString = TIME_STRINGS.EVENING
    }

    return timeString;
}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const username: string | undefined = useAppSelector(selectUsername);
    const gender: Gender | undefined = useAppSelector(selectGender);
    const timeString = getTimeString();

    const onItemPress = (category: Category) => {
        navigation.navigate('Category', {category})
    }

    useEffect(() => {
        getCategories().then((response) => {
            setCategories(response);
        })
    }, []);

    const userGenderString = gender === 'FEMALE' ? 'תרצי' : 'תרצה';

    return (
        <Wrapper>
            <HeadLinedWrapper wrapperSize={8}>
                <StyledText>
                    {timeString} {username}
                    {timeString === TIME_STRINGS.MORNING && <> ☀️ </>}
                    {timeString === TIME_STRINGS.NOON && <> 🌞 </>}
                    {timeString === TIME_STRINGS.EVENING && <> 🌗 </>}
                    {timeString === TIME_STRINGS.NIGHT && <> 🌚 </>}
                </StyledText>
                <StyledText>
                    מה {userGenderString} לעשות היום ?
                </StyledText>
            </HeadLinedWrapper>
            <ItemsWrapper>
                <DragAndDrop items={categories} shouldItemHaveIcons={false} onItemPress={onItemPress} updateOrderFunc={updateCategoryListOrder}/>
            </ItemsWrapper>
        </Wrapper>
    );
}