import { useState } from "react";
import { AVPlaybackStatus } from "expo-av/src/AV";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import { AVPlaybackStatusError } from "expo-av";
import { config } from "../config/config";
import { useSelector } from "react-redux";
import { selectSound } from "../store/audio/audio.selectors";

type UseTextToSpeechProps = {
    text: string;
    gender: 'MALE' | 'FEMALE';
}
export type ReturnedValue = [boolean, () => void];

const languageCode = 'he-IL';

const useTextToSpeech = ({ text, gender }: UseTextToSpeechProps): ReturnedValue => {
    const sound = useSelector(selectSound);
    const [playing, setPlaying] = useState(false);

    const updateStatus = (playbackStatus: AVPlaybackStatus) => {
        setPlaying((playbackStatus as AVPlaybackStatusSuccess).isPlaying);
    };

    const buildRequestUrl = () => {
        const url: URL = new URL(`${config.serverUrl}/tts`);
        url.searchParams.append("text", `"${text}"`);
        url.searchParams.append("gender", gender);
        url.searchParams.append("languageCode", languageCode);
        return url.href;
    }

    const loadAndPlayAudio = async () => {
        try {
            await sound.unloadAsync();

            const result: AVPlaybackStatus = await sound.loadAsync({
                uri: buildRequestUrl()
            });

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
            setPlaying(false);
            console.error('Error when loading/playing Audio', error);
        }
    };

    return [playing, loadAndPlayAudio];
};

export default useTextToSpeech;