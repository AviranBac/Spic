import React from "react";
import { GenericIcon, ICON_COLORS, ICON_TYPES } from "./GenericIcon/GenericIcon";

interface Props {
    id: string,
    imageUrl: string,
    itemName: string,
    onEditPress: (itemId: string, imageUrl: string, itemName: string) => void;
}

export const EditIcon = ({id, imageUrl, itemName, onEditPress}: Props) => {
    return (
        <GenericIcon key={`edit-${id}`}
                     onPress={() => onEditPress(id, imageUrl, itemName)}
                     iconColor={ICON_COLORS.EDIT}
                     iconType={ICON_TYPES.EDIT}/>
    )
}