import {Image, Modal, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Item} from "../../models/item";
import TextToSpeechIcon from "../../components/icons/TextToSpeechIcon";
import {useAppSelector} from "../../store/hooks";
import {selectGender} from "../../store/auth/auth.selectors";
import {CircleIcon} from "../../components/icons/CircleIcon";
import {styles} from "./styles";

export type FullActionModalProps = {
    sentenceBeginning: string,
    item: Item | null,
    onRequestClose: () => void,
    setVisible: (visible: boolean) => void,
    visible: boolean
};

export const FullActionModal = ({
                                    sentenceBeginning,
                                    item,
                                    onRequestClose,
                                    setVisible,
                                    visible
                                }: FullActionModalProps) => {
    const userGender = useAppSelector(selectGender);
    const fullActionText: string = `${sentenceBeginning}${item?.name}`;

    return (
        <Modal animationType="fade"
               transparent={true}
               onDismiss={onRequestClose}
               onRequestClose={onRequestClose}
               visible={visible}>
            {item &&
                <TouchableOpacity style={styles.modalContainer}
                                  onPress={() => setVisible(false)}>
                    <TouchableOpacity style={styles.modalChild}
                                      activeOpacity={1}>
                        <Image source={{uri: item.imageUrl}}
                               style={styles.activeItemImage}/>
                        <View style={styles.itemTextContainer}>
                            <TextToSpeechIcon text={fullActionText}
                                              gender={userGender!}
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
