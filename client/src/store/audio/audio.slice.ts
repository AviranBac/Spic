import { createSlice } from "@reduxjs/toolkit";
import { Audio } from "expo-av";
import { AudioState } from "./audio.model";

const audioInitialState: AudioState = {
    sound: new Audio.Sound()
}

const audioSlice = createSlice({
    name: "audio",
    initialState: audioInitialState,
    reducers: {}
});

export default audioSlice.reducer;