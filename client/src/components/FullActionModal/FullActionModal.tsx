import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ItemWithCategory } from "../../models/item";
import TextToSpeechIcon from "../icons/TextToSpeechIcon";
import { useAppSelector } from "../../store/hooks";
import { CircleIcon } from "../icons/CircleIcon";
import { styles } from "./styles";
import { selectGender } from "../../store/user-details/user-details.selectors";
import { Gender } from "../../store/user-details/user-details.model";
import useSentenceBeginning from "../../hooks/useSentenceBeginning";

export type FullActionModalProps = {
    itemWithCategory: ItemWithCategory | null,
    onRequestClose: () => void,
    setVisible: (visible: boolean) => void,
    visible: boolean
};

export const FullActionModal = ({itemWithCategory, onRequestClose, setVisible, visible}: FullActionModalProps) => {
    const {sentenceBeginning, loaded: sentenceBeginningLoaded} = useSentenceBeginning(itemWithCategory?.category);
    const userGender = useAppSelector(selectGender);
    const fullActionText: string = `${sentenceBeginning}${itemWithCategory?.name}`;

    return (
        <Modal animationType="fade"
               transparent={true}
               onDismiss={onRequestClose}
               onRequestClose={onRequestClose}
               visible={visible}>
            {itemWithCategory && sentenceBeginningLoaded &&
                <TouchableOpacity style={styles.modalContainer}
                                  onPress={() => setVisible(false)}>
                    <TouchableOpacity style={styles.modalChild}
                                      activeOpacity={1}>
                        <Image source={{uri: itemWithCategory.imageUrl}}
                               style={styles.activeItemImage}/>
                        <View style={styles.itemTextContainer}>
                            <TextToSpeechIcon text={fullActionText}
                                              gender={userGender as Gender}
                                              initialPlay={visible} backgroundColor={'transparent'}/>
                            <Text style={styles.itemText}>{fullActionText}</Text>
                        </View>
                        <CircleIcon style={styles.closeModalIcon} iconColor="white" name="close"
                                    size={20}
                                    onPress={() => setVisible(false)}/>
                    </TouchableOpacity>
                </TouchableOpacity>
            }
        </Modal>
    );
};
