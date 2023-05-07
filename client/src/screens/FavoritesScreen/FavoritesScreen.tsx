import {useAppSelector} from "../../store/hooks";
import React, {useEffect, useState} from "react";
import {Text} from 'react-native';
import {selectFavoriteIds} from "../../store/favorites/favorites.selectors";
import {getFavorites} from "../../services/favorites.service";
import {ItemsWrapper} from "../../styles/shared-styles";
import {Wrapper} from "../HomeScreen/styles";
import {DragAndDrop} from "../../components/DragAndDrop/DragAndDrop";

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
        <Wrapper>
            <Text style={{fontSize: 30}}>המועדפים שלי: </Text>
            <ItemsWrapper>
                <DragAndDrop items={favoritesList}/>
            </ItemsWrapper>
        </Wrapper>
    );
}