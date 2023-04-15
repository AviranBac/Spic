import {useAppSelector} from "../../store/hooks";
import {useEffect, useState} from "react";
import { Text, View} from 'react-native';
import {Item} from "../../models/item";
import {selectFavoriteIds} from "../../store/favorites/favorites.selectors";
import {getFavorites} from "../../services/favorites.service";
import {ClickableBox} from "../../components/ClickableBox";
import styled from "styled-components/native";

const ItemsWrapper = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
`;

const HeadLinedWrapper = styled.View`
  flex: 0 0 15%;
  justify-content: center;
  align-items: center;
`;

export const FavoritesScreen = () => {
    const [favoritesList, setFavoritesList] = useState([]);
    const favorites = useAppSelector(selectFavoriteIds);

    useEffect(() => {
        const fetchData = async () => {
            const favorites = await getFavorites();
            setFavoritesList(favorites);
        };
        fetchData();
    }, [favorites]);

    return (
        <HeadLinedWrapper>
            <Text style={{fontSize: 30 }}>המועדפים שלי: </Text>
            <ItemsWrapper>
                {favoritesList?.map((item: Item, id) => (
                    <View key={id}>
                        <ClickableBox name={item.name} imageUrl={item.imageUrl} id={item._id}/>
                    </View>
                ))}
            </ItemsWrapper>
        </HeadLinedWrapper>
    );
}