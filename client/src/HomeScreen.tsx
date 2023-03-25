import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ClickableBox } from "./components/ClickableBox";
import styled from "styled-components/native";
import { getCategories } from "./services/categories.service";
import { useAppSelector } from "./store/hooks";
import { selectUsername } from "./store/auth/auth.selectors";

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

interface Category {
    imageUrl: string
    items: []
    name: string
    _id: string
}

export const HomeScreen = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const username: string | undefined = useAppSelector(selectUsername);

    useEffect(() => {
        getCategories().then((response) => {
            setCategories(response);
        })
    }, [])

    return (
        <ScrollView>
            <Wrapper>
                <HeadLinedWrapper>
                    <StyledText>
                        בוקר טוב ${username} ☀️
                    </StyledText>
                    <StyledText>
                        מה תרצה לעשות היום ?
                    </StyledText>
                </HeadLinedWrapper>
                <CategoriesWrapper>
                    {
                        categories?.map((category) => {
                            return <ClickableBox categoryName={category.name} imageUrl={category.imageUrl}
                                                 key={category._id}/>
                        })
                    }
                </CategoriesWrapper>
            </Wrapper>
        </ScrollView>
    );
}