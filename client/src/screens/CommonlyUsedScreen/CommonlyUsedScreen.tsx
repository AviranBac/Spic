import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ItemWithCategory } from "../../models/item";
import { getCommonlyUsedItems, recordItemChosen } from "../../services/items.service";
import { HeadLinedWrapper, ItemsWrapper } from "../../styles/shared-styles";
import { ClickableBox } from "../../components/ClickableBox";
import { FullActionModal } from "../../components/FullActionModal/FullActionModal";
import { useIsFocused } from "@react-navigation/native";

export const CommonlyUsedScreen = () => {
    const [commonlyUsedItems, setCommonlyUsedItems] = useState<ItemWithCategory[]>([]);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [activeItemWithCategory, setActiveItemWithCategory] = useState<ItemWithCategory | null>(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getCommonlyUsedItems()
                .then(setCommonlyUsedItems);
        } else {
            setCommonlyUsedItems([]);
        }
    }, [isFocused]);

    const onItemPress = (itemWithCategory: ItemWithCategory) => {
        const recommendedItemIds: string[] = commonlyUsedItems.map(({_id}) => _id);

        recordItemChosen(itemWithCategory, recommendedItemIds)
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
                <Text style={{fontSize: 30}}>פעולות בשימוש נפוץ: </Text>

                <ItemsWrapper style={{direction: "rtl"}}>
                    {commonlyUsedItems.map((itemWithCategory: ItemWithCategory, id) => (
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