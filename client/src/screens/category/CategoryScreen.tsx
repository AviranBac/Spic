import React, {useEffect, useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../../utils/navigation-stack";
import {deleteItem, getItems, recordItemChosen, updateItemListOrder} from "../../services/items.service";
import {Item, ItemWithCategory} from "../../models/item";
import {FullActionModal} from "../../components/FullActionModal/FullActionModal";
import {CircleIcon} from "../../components/icons/CircleIcon";
import {useIsFocused} from "@react-navigation/native";
import useSentenceBeginning from "../../hooks/useSentenceBeginning";
import {DragAndDrop} from "../../components/DragAndDrop/DragAndDrop";
import {styles} from "./styles";
import {Text, View} from "react-native";
import {EditRemoveSwitch} from "../../components/icons/EditRemoveSwitch";
import {DeleteModal} from "../../components/DeleteModal/DeleteModal";
import Toast from "react-native-toast-message";

type CategoryScreenProps = StackScreenProps<HomeStackParamList, 'Category'>;

export const CategoryScreen = ({navigation, route}: CategoryScreenProps) => {
    const [items, setItems] = useState<Item[]>([]);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [activeItemWithCategory, setActiveItemWithCategory] = useState<ItemWithCategory | null>(null);
    const {category} = route.params;
    const {_id: categoryId} = category;
    const {sentenceBeginning} = useSentenceBeginning(category);
    const isFocused = useIsFocused();
    const [editRemoveMode, setEditRemoveMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');
    const handleOnPress = (itemId: string) => {
        setIdToDelete(itemId);
        setShowDeleteModal(true);
    }

    const handleOnClose = () => {
        setShowDeleteModal(false);
        setIdToDelete('');
    }

    const handleDelete = () => {
        deleteItem(idToDelete).then(() => {
            setItems(items.filter((item) => item._id !== idToDelete));
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
    }

    navigation.setOptions({
        headerRight: () => (
            <View style={{
                gap: 30,
                paddingRight: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <EditRemoveSwitch isEditMode={editRemoveMode} onChange={setEditRemoveMode}/>
                <Text style={{fontWeight: 'bold'}}>
                    מצב עריכה
                </Text>
            </View>
        ),
    })
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
            <DragAndDrop items={items} onItemPress={onItemPress} onDeletePress={handleOnPress}
                         editRemoveMode={editRemoveMode}
                         updateOrderFunc={(orderedItemIds: string[]) => updateItemListOrder(orderedItemIds, categoryId)}/>
            <FullActionModal
                itemWithCategory={activeItemWithCategory}
                onRequestClose={onModalClose}
                setVisible={setModalVisible}
                visible={isModalVisible}/>
            <DeleteModal handleClose={handleOnClose} showDeleteModal={showDeleteModal} deleteItem={handleDelete}/>
            <CircleIcon style={styles.addItemIconContainer} iconColor="white" name="plus" size={40}
                        onPress={() => navigation.navigate('AddItem', {category})}/>
        </>
    )
};