import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { ItemWithCategory } from "../../models/item";
import { selectFavoriteIds } from "../../store/favorites/favorites.selectors";
import { getFavorites } from "../../services/favorites.service";
import { ClickableBox } from "../../components/ClickableBox";
import { HeadLinedWrapper, ItemsWrapper } from "../../styles/shared-styles";

export const FavoritesScreen = () => {
    const [favoritesList, setFavoritesList] = useState([] as ItemWithCategory[]);
    const favorites = useAppSelector(selectFavoriteIds);

    useEffect(() => {
        const fetchData = async () => {
            const favorites: ItemWithCategory[] = await getFavorites();
            setFavoritesList(favorites);
        };
        fetchData();
    }, [favorites]);

    return (
        <HeadLinedWrapper>
            <Text style={{fontSize: 30 }}>המועדפים שלי: </Text>
            <ItemsWrapper>
                {favoritesList?.map((item: ItemWithCategory, id) => (
                    <View key={id}>
                        <ClickableBox name={item.name} imageUrl={item.imageUrl} id={item._id}/>
                    </View>
                ))}
            </ItemsWrapper>
        </HeadLinedWrapper>
    );
}