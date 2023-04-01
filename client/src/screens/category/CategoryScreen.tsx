import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/navigation-stack";
import { useAppSelector } from "../../store/hooks";
import { selectEmail } from "../../store/auth/auth.selectors";
import { getItems } from "../../services/items.service";
import { ClickableBox } from "../../components/ClickableBox";
import { Item } from "../../models/item";
import { ScrollView, StyleSheet, View } from "react-native";
import { FullActionModal } from "./FullActionModal";
import { CircleIcon } from "../../components/icons/CircleIcon";

type CategoryScreenProps = StackScreenProps<HomeStackParamList, 'Category'>;

export const CategoryScreen = ({navigation, route}: CategoryScreenProps) => {
    const email = useAppSelector(selectEmail);
    const [items, setItems] = useState<Item[]>([]);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [activeItem, setActiveItem] = useState<Item | null>(null);
    const {category} = route.params;
    const {_id: categoryId, sentenceBeginning} = category;

    useEffect(() => {
        navigation.setOptions({
            title: sentenceBeginning + '...'
        });
    }, [navigation]);

    useEffect(() => {
        getItems(categoryId, email!)
            .then(setItems);
    }, [email]);

    const onItemPress = (item: Item) => {
        // TODO: document the chosen action
        setModalVisible(true);
        setActiveItem(item);
    };

    const onModalClose = () => {
        setActiveItem(null);
    };

    return (
        <>
            <ScrollView>
                <View style={styles.itemsWrapper}>
                    {
                        items?.map((item: Item) => {
                            return <ClickableBox name={item.name}
                                                 imageUrl={item.imageUrl}
                                                 onPress={() => onItemPress(item)}
                                                 key={item._id}/>
                        })
                    }
                </View>

                <FullActionModal sentenceBeginning={sentenceBeginning}
                                 item={activeItem}
                                 onRequestClose={onModalClose}
                                 setVisible={setModalVisible}
                                 visible={isModalVisible}/>
            </ScrollView>

            <CircleIcon style={styles.addItemIconContainer} iconColor="white" name="plus" size={40}
                        onPress={() => navigation.navigate('AddItem', {category})}/>
        </>
    )
};

const styles = StyleSheet.create({
    itemsWrapper: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    },
    addItemIconContainer: {
        backgroundColor: '#009dff',
        position: 'absolute',
        bottom: 10,
        left: 10
    }
});