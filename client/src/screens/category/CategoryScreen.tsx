import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/navigation-stack";
import { getItems, recordItemChosen } from "../../services/items.service";
import { ClickableBox } from "../../components/ClickableBox";
import { Item, ItemWithCategory } from "../../models/item";
import { ScrollView, View } from "react-native";
import { FullActionModal } from "../../components/FullActionModal/FullActionModal";
import { CircleIcon } from "../../components/icons/CircleIcon";
import { useIsFocused } from "@react-navigation/native";
import useSentenceBeginning from "../../hooks/useSentenceBeginning";
import { styles } from "./styles";

type CategoryScreenProps = StackScreenProps<HomeStackParamList, 'Category'>;

export const CategoryScreen = ({navigation, route}: CategoryScreenProps) => {
    const [items, setItems] = useState<Item[]>([]);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [activeItemWithCategory, setActiveItemWithCategory] = useState<ItemWithCategory | null>(null);
    const {category} = route.params;
    const {_id: categoryId} = category;
    const {sentenceBeginning} = useSentenceBeginning(category);
    const isFocused = useIsFocused();

    useEffect(() => {
        navigation.setOptions({
            title: sentenceBeginning ? sentenceBeginning.trim() + '...' : ''
        });
    }, [navigation, sentenceBeginning]);

    useEffect(() => {
        if (isFocused) {
            getItems(categoryId)
                .then(setItems);
        }
    }, [isFocused]);

    const onItemPress = (item: Item) => {
        recordItemChosen(item)
            .then(() => {
                setActiveItemWithCategory({...item, category});
                setModalVisible(true);
            })
            .catch(console.error);
    };

    const onModalClose = () => {
        setActiveItemWithCategory(null);
    };

    return (
        <>
            <ScrollView>
                <View style={styles.itemsWrapper}>
                    {
                        items?.map((item: Item) => {
                            return <ClickableBox name={item.name}
                                                 id={item._id}
                                                 imageUrl={item.imageUrl}
                                                 onPress={() => onItemPress(item)}
                                                 key={item._id}/>
                        })
                    }
                </View>

                <FullActionModal itemWithCategory={activeItemWithCategory}
                                 onRequestClose={onModalClose}
                                 setVisible={setModalVisible}
                                 visible={isModalVisible}/>
            </ScrollView>

            <CircleIcon style={styles.addItemIconContainer} iconColor="white" name="plus" size={40}
                        onPress={() => navigation.navigate('AddItem', {category})}/>
        </>
    )
};