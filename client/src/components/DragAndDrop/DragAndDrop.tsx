import {Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {DragSortableView} from "react-native-drag-sort";
import React, {useEffect, useRef, useState} from "react";
import {ClickableBox} from "../ClickableBox";
import {ItemsWrapper} from "../../styles/shared-styles";
import {styles} from "./styles";
import {Category} from "../../models/category";
import Toast from "react-native-toast-message";
import {updateItemListOrder} from "../../services/items.service";
import {updateFavoriteListOrder} from "../../services/favorites.service";
import {updateCategoryListOrder} from "../../services/categories.service";

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const childrenWidth = deviceWidth / 4;
const childrenHeight = deviceHeight / 4;

interface Props {
    items: any[];
    onItemPress?: (item: any) => void;
    category?: Category;
    isFavorites?: boolean;
    isHomeScreen?: boolean;
}

export const DragAndDrop = ({items, onItemPress, category, isFavorites = false, isHomeScreen = false}: Props) => {
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [isEditState, setIsEdit] = useState(false);
    const setMap = useRef(new Map());
    const [itemsList, setItemsList] = useState(items);
    const [isPortrait, setIsPortrait] = useState(true);

    useEffect(() => {
        const handleOrientationChange = ({window}: any) => {
            const {height, width} = window;
            setIsPortrait(height > width);
        };

        const dimensionsHandler = Dimensions.addEventListener('change', handleOrientationChange);

        return () => {
            dimensionsHandler.remove();
        };
    }, []);
    useEffect(() => {
        setItemsList(items)
    }, [items])

    const renderSelectedItemView = (item: { name: string, _id: string, imageUrl: string }, index: number) => {
        setMap.current.set(item._id, index);
        return (
            <View key={item._id}>
                <ClickableBox name={item.name}
                              id={item._id}
                              onPress={() => onItemPress && onItemPress(item)}
                              imageUrl={item.imageUrl}
                              key={item._id}
                              hasIcon={!isHomeScreen}
                />

            </View>
        )
    }

    const onSelectedDragEnd = () => {
        setScrollEnabled(true);
    }

    const onSelectedDragStart = () => {
        if (!isEditState) {
            setIsEdit(true);
            setScrollEnabled(false);
        } else {
            setScrollEnabled(false);
        }
    }

    const onSaveChanges = () => {
        setIsEdit(false);
        const sortedMap = new Map(Array.from(setMap.current.entries()).sort((a, b) => a[1] - b[1]));
        const categoryId = isFavorites ? 'favorites' : category?._id;
        Toast.show({
            type: 'success',
            text1: 'שמירה בוצעה בהצלחה',
            text2: 'סדר הפריטים במערכת ⭐️',
        });

        isFavorites ? updateFavoriteListOrder(Array.from(sortedMap.keys())).then(setItemsList)
            : isHomeScreen ? updateCategoryListOrder(Array.from(sortedMap.keys())).then(setItemsList) :
                updateItemListOrder(Array.from(sortedMap.keys()), categoryId).then(setItemsList);
    }

    const handleReset = () => {
        setIsEdit(false)
        setItemsList([...itemsList])
    };

    return (
        <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
            <ScrollView
                scrollEnabled={scrollEnabled}>
                {isEditState && <View style={styles.hurdle}>
                    <TouchableOpacity style={styles.hurdle_edit} onPress={onSaveChanges}>
                        <Text style={styles.hurdle_edit_text}>{'שמירת שינויים'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.hurdle_edit} onPress={handleReset}>
                        <Text style={styles.hurdle_edit_text}>{'ביטול'}</Text>
                    </TouchableOpacity>
                </View>}
                <ItemsWrapper>
                    <DragSortableView
                        dataSource={itemsList}
                        parentWidth={deviceWidth}
                        childrenWidth={isPortrait ? childrenWidth : childrenWidth}
                        childrenHeight={isPortrait ? childrenHeight : childrenHeight}
                        marginChildrenTop={10}
                        marginChildrenBottom={10}
                        marginChildrenLeft={45}
                        marginChildrenRight={10}
                        onDragStart={onSelectedDragStart}
                        onDragEnd={onSelectedDragEnd}
                        keyExtractor={(item) => item._id}
                        renderItem={renderSelectedItemView}
                    />
                </ItemsWrapper>
            </ScrollView>
        </SafeAreaView>
    )
}