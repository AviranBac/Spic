import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {DragSortableView} from "react-native-drag-sort";
import React, {useState} from "react";
import {ClickableBox} from "../ClickableBox";
import {ItemsWrapper} from "../../styles/shared-styles";
import {styles} from "./styles";

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const childrenWidth = deviceWidth / 4;
const childrenHeight = deviceHeight / 3;

const sortWidth = deviceWidth

export const DragAndDrop = ({items, onItemPress}: any) => {

    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [isEditState, setIsEdit] = useState(false);

    const renderSelectedItemView = (item: { name: string, _id: string, imageUrl: string }, index: number) => {
        return (
            <View key={item._id}>
                <ClickableBox name={item.name}
                              id={item._id}
                              onPress={() => onItemPress(item)}
                              imageUrl={item.imageUrl}
                              key={item._id}/>

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

    const onEditClick = () => {
        setIsEdit(prevState => !prevState);
    }

    return (
        <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
            <ScrollView
                scrollEnabled={scrollEnabled}>
                {/*{isEditState && <View style={styles.hurdle}>*/}
                {/*    <TouchableOpacity style={styles.hurdle_edit} onPress={onEditClick}>*/}
                {/*        <Text style={styles.hurdle_edit_text}>{'מצב עריכה'}</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>}*/}
                <ItemsWrapper>
                    <DragSortableView
                        dataSource={items}
                        parentWidth={sortWidth}
                        childrenWidth={Platform.OS === 'ios' ? 200 : childrenWidth}
                        childrenHeight={Platform.OS === 'ios' ? deviceHeight / 4 : childrenHeight}
                        marginChildrenTop={10}
                        marginChildrenBottom={10}
                        marginChildrenLeft={10}
                        marginChildrenRight={10}
                        onDragStart={onSelectedDragStart}
                        onDragEnd={onSelectedDragEnd}
                        keyExtractor={(item) => item._id}
                        renderItem={renderSelectedItemView}/>
                </ItemsWrapper>
            </ScrollView>
        </SafeAreaView>
    )
}