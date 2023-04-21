import { useAppSelector } from "../../store/hooks";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from 'react-native';
import { ItemWithCategory } from "../../models/item";
import { selectFavoriteIds } from "../../store/favorites/favorites.selectors";
import { getFavorites } from "../../services/favorites.service";
import { ClickableBox } from "../../components/ClickableBox";
import { HeadLinedWrapper, ItemsWrapper } from "../../styles/shared-styles";
import { recordItemChosen } from "../../services/items.service";
import { FullActionModal } from "../../components/FullActionModal/FullActionModal";

export const FavoritesScreen = () => {
    const [favoritesList, setFavoritesList] = useState([] as ItemWithCategory[]);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [activeItemWithCategory, setActiveItemWithCategory] = useState<ItemWithCategory | null>(null);
    const favorites = useAppSelector(selectFavoriteIds);

    useEffect(() => {
        const fetchData = async () => {
            const favorites: ItemWithCategory[] = await getFavorites();
            setFavoritesList(favorites);
        };
        fetchData();
    }, [favorites]);

    const onItemPress = (itemWithCategory: ItemWithCategory) => {
        recordItemChosen(itemWithCategory)
            .then(() => {
                setActiveItemWithCategory(itemWithCategory);
                setModalVisible(true);
            })
            .catch(console.error);
    };

    const onModalClose = () => {
        setActiveItemWithCategory(null);
    };

    return (
        <ScrollView>
            <HeadLinedWrapper>
                <Text style={{fontSize: 30 }}>המועדפים שלי: </Text>

                <ItemsWrapper>
                    {favoritesList?.map((itemWithCategory: ItemWithCategory, id) => (
                        <View key={id}>
                            <ClickableBox name={itemWithCategory.name}
                                          id={itemWithCategory._id}
                                          imageUrl={itemWithCategory.imageUrl}
                                          onPress={() => onItemPress(itemWithCategory)}/>
                        </View>
                    ))}
                </ItemsWrapper>

                <FullActionModal itemWithCategory={activeItemWithCategory}
                                 onRequestClose={onModalClose}
                                 setVisible={setModalVisible}
                                 visible={isModalVisible}/>
            </HeadLinedWrapper>
        </ScrollView>
    );
}