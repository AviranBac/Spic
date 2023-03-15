import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AudioState } from "./audio.model";

const selectAudioState: (state: RootState) => AudioState
    = (state: RootState) => state.audio;

export const selectSound = createSelector(
    [selectAudioState],
    (audioState) => audioState?.sound
);