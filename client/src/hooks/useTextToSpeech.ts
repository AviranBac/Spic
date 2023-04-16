import { useState } from "react";
import { AVPlaybackStatus } from "expo-av/src/AV";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import { Audio, AVPlaybackStatusError } from "expo-av";
import { config } from "../config/config";
import { useSelector } from "react-redux";
import { selectSound } from "../store/audio/audio.selectors";
import {Gender} from "../store/user-details/user-details.model";

type UseTextToSpeechProps = {
    text: string;
    gender: Gender;
}

export interface UseTextToSpeechOutput {
    loading: boolean;
    playing: boolean;
    loadAndPlayAudioFn: () => void;
    forceStopFn: () => void
}

const languageCode = 'he-IL';

const useTextToSpeech = ({text, gender}: UseTextToSpeechProps): UseTextToSpeechOutput => {
    const sound: Audio.Sound = useSelector(selectSound);
    const [loading, setLoading] = useState(false);
    const [playing, setPlaying] = useState(false);

    const updateStatus: (playBackStatus: AVPlaybackStatus) => void = (playbackStatus: AVPlaybackStatus) => {
        setPlaying((playbackStatus as AVPlaybackStatusSuccess).isPlaying);
    };

    const buildRequestUrl: () => string = () => {
        const url: URL = new URL(`${config.serverUrl}/tts`);
        url.searchParams.append("text", `"${text}"`);
        url.searchParams.append("gender", gender);
        url.searchParams.append("languageCode", languageCode);
        return url.href;
    }

    const loadAndPlayAudioFn: () => void = async () => {
        try {
            await sound.unloadAsync();

            setLoading(true);
            const result: AVPlaybackStatus = await sound.loadAsync({
                uri: buildRequestUrl()
            });
            setLoading(false);

            if ((result as AVPlaybackStatusError).error) {
                setPlaying(false);
                console.error('Error when loading Audio', (result as AVPlaybackStatusError).error);
            } else if (!result.isLoaded) {
                setPlaying(false);
                console.error('Error when loading Audio');
            } else {
                sound.setOnPlaybackStatusUpdate(updateStatus);
                await sound.playAsync();
            }
        } catch (error) {
            setLoading(false);
            setPlaying(false);
            console.error('Error when loading/playing Audio', error);
        }
    };

    const forceStopFn = async () => {
        await sound.unloadAsync();
        setLoading(false);
        setPlaying(false);
    };

    return {loading, playing, loadAndPlayAudioFn, forceStopFn};
};

export default useTextToSpeech;