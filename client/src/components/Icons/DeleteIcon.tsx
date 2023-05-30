import React from "react";
import { GenericIcon, ICON_COLORS, ICON_TYPES } from "./GenericIcon/GenericIcon";

interface Props {
    id: string,
    onDeletePress: (itemId: string) => void;
}

export const DeleteIcon = ({id, onDeletePress}: Props) => {
    return (
        <GenericIcon key={`delete-${id}`}
                     onPress={() => onDeletePress(id)}
                     iconColor={ICON_COLORS.DELETE}
                     iconType={ICON_TYPES.DELETE}/>
    )
}