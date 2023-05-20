import {useAppSelector} from "../../store/hooks";
import React, {useEffect, useState} from "react";
import {ScrollView, Text, View} from 'react-native';
import {selectFavoriteIds} from "../../store/favorites/favorites.selectors";
import {getFavorites} from "../../services/favorites.service";
import {HeadLinedWrapper, ItemsWrapper} from "../../styles/shared-styles";
import {Wrapper} from "../HomeScreen/styles";
import {DragAndDrop} from "../../components/DragAndDrop/DragAndDrop";
import {ItemWithCategory} from "../../models/item";
import {ClickableBox} from "../../components/ClickableBox";
import {recordItemChosen} from "../../services/items.service";
import {FullActionModal} from "../../components/FullActionModal/FullActionModal";

export const FavoritesScreen = () => {
    const [favoriteItems, setFavoriteItems] = useState([] as ItemWithCategory[]);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [activeItemWithCategory, setActiveItemWithCategory] = useState<ItemWithCategory | null>(null);
    const favorites = useAppSelector(selectFavoriteIds);

    useEffect(() => {
        const fetchData = async () => {
            const favorites: ItemWithCategory[] = await getFavorites();
            setFavoriteItems(favorites);
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
        <Wrapper>
            <HeadLinedWrapper wrapperSize={8}>
                <Text style={{fontSize: 30}}>המועדפים שלי: </Text>
            </HeadLinedWrapper>
            <ItemsWrapper>
                <DragAndDrop items={favoriteItems} isFavorites={true}/>
            </ItemsWrapper>
            <FullActionModal itemWithCategory={activeItemWithCategory}
                             onRequestClose={onModalClose}
                             setVisible={setModalVisible}
                             visible={isModalVisible}/>
        </Wrapper>
    )
        ;
}