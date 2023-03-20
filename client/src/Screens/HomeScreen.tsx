import {ScrollView} from "react-native";
import React from "react";
import {ClickableBox} from "../Components/ClickableBox";
import styled from "styled-components/native";

const CATEGORIES_LIST: string[] = ['play', 'dress'];

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const HeadLindWrapper = styled.View`
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
  padding-top: 10px;
`;

export const HomeScreen = () => {
    return (
        <ScrollView>
            <Wrapper>
                <HeadLindWrapper>
                    <StyledText>
                        בוקר טוב אלי ☀️
                    </StyledText>
                    <StyledText>
                        מה תרצה לעשות היום ?
                    </StyledText>
                </HeadLindWrapper>
                <CategoriesWrapper>
                    {
                        CATEGORIES_LIST.map((category) => {
                            return <ClickableBox categoryName={category} key={category}/>
                        })
                    }
                </CategoriesWrapper>
            </Wrapper>
        </ScrollView>
    );
}