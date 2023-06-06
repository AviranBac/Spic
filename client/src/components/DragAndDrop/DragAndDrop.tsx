import {Dimensions, SafeAreaView, ScrollView, View} from "react-native";
import {DragSortableView} from "react-native-drag-sort";
import React, {useEffect, useRef, useState} from "react";
import {ClickableBox} from "../ClickableBox";
import {ItemsWrapper, StyledButton} from "../../styles/shared-styles";
import {styles} from "./styles";
import Toast from "react-native-toast-message";

interface Props {
    items: any[];
    onItemPress?: (item: any) => void;
    shouldItemHaveIcons?: boolean;
    updateOrderFunc: (orderedIds: string[]) => Promise<any[]>;
    isEditMode?: boolean;
    onDeletePress?: (itemId: string) => void;
    onEditPress?: (itemId: string, imageUrl: string, itemName: string) => void;
}

export const DragAndDrop = ({
                                items,
                                onItemPress,
                                shouldItemHaveIcons = true,
                                updateOrderFunc,
                                isEditMode = false,
                                onDeletePress,
                                onEditPress
                            }: Props) => {
    const iphoneWidth = 500;
    const initialWidth = Dimensions.get('window').width;
    const initialHeight = Dimensions.get('window').height;
    const portraitCheck = Dimensions.get('window').height > Dimensions.get('window').width;

    const [deviceWidth, setDeviceWidth] = useState(initialWidth);
    const [childrenWidth, setChildrenWidth] = useState(portraitCheck ? initialWidth / 4 : initialWidth / 6);
    const [childrenHeight, setChildrenHeight] = useState(portraitCheck ? initialHeight / 4 : initialHeight / 3);

    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const setMap = useRef(new Map());
    const [itemsList, setItemsList] = useState(items);
    const [isPortrait, setIsPortrait] = useState(portraitCheck);

    useEffect(() => {
        const handleOrientationChange = ({window}: any) => {
            const {height, width} = window;
            setDeviceWidth(width);

            if (height > width) {
                setIsPortrait(true);
                setChildrenWidth(window.width / 4);
                setChildrenHeight(window.height / 4);
            } else {
                setIsPortrait(false);
                setChildrenWidth(window.width / 6);
                setChildrenHeight(window.height / 3);
            }
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
                              hasIcon={shouldItemHaveIcons}
                              isEditMode={isEditMode}
                              onDeletePress={onDeletePress}
                              onEditPress={onEditPress}
                />
            </View>
        )
    }

    const onSelectedDragEnd = () => {
        setScrollEnabled(true);
    }

    const onSelectedDragStart = () => {
        if (!isEdit) {
            setIsEdit(true);
        }
        setScrollEnabled(false);
    }

    const onSaveChanges = () => {
        setIsEdit(false);
        const sortedMap = new Map(Array.from(setMap.current.entries()).sort((a, b) => a[1] - b[1]));
        const iterable: IterableIterator<any> = sortedMap.keys();
        const array: string[] = Array.from(iterable);

        updateOrderFunc(array).then((res) => {
            setItemsList(res);
            Toast.show({
                type: 'success',
                text1: 'שמירה בוצעה בהצלחה',
                text2: 'סדר הפריטים במערכת עודכן ⭐️',
            });
        }).catch(() => Toast.show({
                type: 'error',
                text1: 'שמירה נכשלה',
                text2: 'סדר הפריטים במערכת לא עודכן 🚫',
            })
        )
    }

    const handleReset = () => {
        setIsEdit(false)
        setItemsList([...itemsList])
    };

    return (
        <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
            <ScrollView
                scrollEnabled={scrollEnabled}>
                {isEdit && <View style={styles.hurdle}>
                    <StyledButton title={'שמירת שינויים'} onPress={onSaveChanges}/>
                    <StyledButton title={'ביטול'} onPress={handleReset}/>
                </View>}
                <ItemsWrapper>
                    <DragSortableView
                        dataSource={itemsList || []}
                        parentWidth={deviceWidth}
                        childrenWidth={childrenWidth}
                        childrenHeight={childrenHeight}
                        marginChildrenTop={10}
                        marginChildrenBottom={10}
                        marginChildrenLeft={isPortrait ? initialWidth < iphoneWidth ? 10 : 45 : 62}
                        marginChildrenRight={isPortrait ? initialWidth < iphoneWidth ? 80 : 10 : 20}
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
