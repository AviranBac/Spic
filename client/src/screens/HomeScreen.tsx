import {ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import {ClickableBox} from "../components/ClickableBox";
import styled from "styled-components/native";
import {getCategories} from "../services/categories.service";
import {useAppSelector} from "../store/hooks";
import {selectGender, selectUsername} from "../store/auth/auth.selectors";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../utils/navigation-stack";
import {Category} from "../models/category";
import {Gender} from "../store/auth/auth.model";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const HeadLinedWrapper = styled.View`
  flex: 0 0 15%;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 25px;
`;

const CategoriesWrapper = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
`;

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

    useEffect(() => {
        getCategories(gender).then((response) => {
            setCategories(response);
        })
    }, [gender]);

    const userGenderString = gender === 'FEMALE' ? 'תרצי' : 'תרצה';

    return (
        <ScrollView>
            <Wrapper>
                <HeadLinedWrapper>
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
                <CategoriesWrapper>
                    {
                        categories?.map((category: Category) => {
                            return <ClickableBox name={category.name}
                                                 id={category._id}
                                                 imageUrl={category.imageUrl}
                                                 onPress={() => navigation.navigate('Category', {category})}
                                                 hasTtsIcon={false}
                                                 key={category._id}/>
                        })
                    }
                </CategoriesWrapper>
            </Wrapper>
        </ScrollView>
    );
}