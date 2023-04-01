import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ClickableBox } from "../components/ClickableBox";
import styled from "styled-components/native";
import { getCategories } from "../services/categories.service";
import { useAppSelector } from "../store/hooks";
import { selectUsername } from "../store/auth/auth.selectors";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "../utils/navigation-stack";
import { Category } from "../models/category";

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

export const HomeScreen = ({navigation}: HomeScreenProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const username: string | undefined = useAppSelector(selectUsername);

    useEffect(() => {
        getCategories().then((response) => {
            setCategories(response);
        })
    }, []);

    return (
        <ScrollView>
            <Wrapper>
                <HeadLinedWrapper>
                    <StyledText>
                        בוקר טוב {username} ☀️
                    </StyledText>
                    <StyledText>
                        מה תרצה לעשות היום ?
                    </StyledText>
                </HeadLinedWrapper>
                <CategoriesWrapper>
                    {
                        categories?.map((category: Category) => {
                            return <ClickableBox name={category.name}
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