import {Modal, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from "../FullActionModal/styles";
import {CircleIcon} from "../icons/CircleIcon";
import {StyledButton} from "../../styles/shared-styles";
import {StyledText} from "../../screens/HomeScreen/styles";

interface Props {
    showDeleteModal?: boolean;
    handleClose: () => void;
    deleteItem: () => void;
}

export const DeleteModal = ({handleClose, showDeleteModal, deleteItem}: Props) => {
    return (
        <View>
            <Modal animationType="fade"
                   transparent={true}
                   onDismiss={handleClose}
                   onRequestClose={handleClose}
                   visible={showDeleteModal}>
                <TouchableOpacity style={styles.modalContainer}
                                  onPress={handleClose}>
                    <TouchableOpacity style={styles.modalChild}
                                      activeOpacity={1}>
                        <View style={{
                            flexDirection: 'column',
                            gap: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <StyledText> האם ברצונך למחוק פריט זה ?</StyledText>
                            <Text>️❗️️ פעולה זו תגרום להסרת הפריט ❗️️</Text>
                            <View
                                style={{flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'center'}}>
                                <StyledButton title={'אישור'} onPress={deleteItem}/>
                                <StyledButton title={'ביטול'} onPress={handleClose}/>
                            </View>
                        </View>
                        <CircleIcon style={styles.closeModalIcon} iconColor="white" name="close"
                                    size={20}
                                    onPress={handleClose}/>
                    </TouchableOpacity>
                </TouchableOpacity>

            </Modal>

        </View>
    )
}