import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "../../utils/navigation-stack";
import { deleteItem, getItems, recordItemChosen, updateItemListOrder } from "../../services/items.service";
import { Item, ItemWithCategory } from "../../models/item";
import { FullActionModal } from "../../components/FullActionModal/FullActionModal";
import { CircleIcon } from "../../components/Icons/CircleIcon";
import { useIsFocused } from "@react-navigation/native";
import useSentenceBeginning from "../../hooks/useSentenceBeginning";
import { DragAndDrop } from "../../components/DragAndDrop/DragAndDrop";
import { styles } from "./styles";
import { Text, View } from "react-native";
import { EditRemoveSwitch } from "../../components/Icons/EditRemoveSwitch";
import { DeleteModal } from "../../components/DeleteModal/DeleteModal";
import Toast from "react-native-toast-message";
import { getFavorites } from "../../services/favorites.service";
import { upsertFavoritesThunk } from "../../store/favorites/favorites.slice";
import { useAppDispatch } from "../../store/hooks";

type CategoryScreenProps = StackScreenProps<HomeStackParamList, 'Category'>;

export const CategoryScreen = ({navigation, route}: CategoryScreenProps) => {
    const dispatch = useAppDispatch();
    const [items, setItems] = useState<Item[]>([]);
    const [isFullActionModalVisible, setIsFullActionModalVisible] = useState<boolean>(false);
    const [activeItemWithCategory, setActiveItemWithCategory] = useState<ItemWithCategory | null>(null);
    const {category} = route.params;
    const {_id: categoryId} = category;
    const {sentenceBeginning} = useSentenceBeginning(category);
    const isFocused = useIsFocused();
    const [isEditMode, setIsEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{
                    gap: 30,
                    paddingRight: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <EditRemoveSwitch isEditMode={isEditMode} onChange={setIsEditMode}/>
                    <Text style={{fontWeight: 'bold'}}>
                        מצב עריכה
                    </Text>
                </View>
            ),
        });
    }, [navigation, isEditMode]);

    const onDeletePress = (itemId: string) => {
        setIdToDelete(itemId);
        setShowDeleteModal(true);
    }

    const onEditPress = (itemId: string, imageUrl: string, itemName: string) => {
        navigation.navigate('UpsertItem', {category, itemId, imageUrl, itemName});
    }

    const handleOnClose = () => {
        setShowDeleteModal(false);
        setIdToDelete('');
    }

    const handleDelete = () => {
        deleteItem(idToDelete).then(() => {
            setItems(items.filter((item) => item._id !== idToDelete));
            const fetchData = async () => {
                const favorites: ItemWithCategory[] = await getFavorites();
                const filteredFavorites: string[] = favorites?.map((item: { _id: string; }) => item._id);
                dispatch(upsertFavoritesThunk(filteredFavorites));
            };
            fetchData();
            Toast.show({
                type: 'success',
                text1: 'מחיקה בוצעה בהצלחה',
                text2: 'הפריטים במערכת עודכנו ⭐️',
            });
        }).catch(() => Toast.show({
                type: 'error',
                text1: 'מחיקה נכשלה',
                text2: 'הפריט הנבחר לא נמחק 🚫',
            })
        );
        setShowDeleteModal(false);
    };

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
                setIsFullActionModalVisible(true);
            })
            .catch(console.error);
    };

    const onModalClose = () => {
        setActiveItemWithCategory(null);
    };

    return (
        <>
            <DragAndDrop items={items} onItemPress={onItemPress} onDeletePress={onDeletePress}
                         isEditMode={isEditMode} onEditPress={onEditPress}
                         updateOrderFunc={(orderedItemIds: string[]) => updateItemListOrder(orderedItemIds, categoryId)}/>
            <FullActionModal
                itemWithCategory={activeItemWithCategory}
                onRequestClose={onModalClose}
                setVisible={setIsFullActionModalVisible}
                visible={isFullActionModalVisible}/>
            <DeleteModal handleClose={handleOnClose} showDeleteModal={showDeleteModal} deleteItem={handleDelete}/>
            <CircleIcon style={styles.addItemIconContainer} iconColor="white" name="plus" size={40}
                        onPress={() => navigation.navigate('UpsertItem', {category})}/>
        </>
    )
};