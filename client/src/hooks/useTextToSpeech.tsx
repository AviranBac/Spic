import { useContext, useState } from "react";
import { AVPlaybackStatus } from "expo-av/src/AV";
import { AVPlaybackStatusSuccess } from "expo-av/src/AV.types";
import SoundContext from "../store/SoundContext";
import { AVPlaybackStatusError } from "expo-av";

type UseTextToSpeechProps = {
    text: string;
    gender: 'MALE' | 'FEMALE';
}

export type ReturnedValue = [boolean, () => void];

const useTextToSpeech = ({ text, gender }: UseTextToSpeechProps): ReturnedValue => {
    const { sound } = useContext(SoundContext);
    const [playing, setPlaying] = useState(false);
    const languageCode = 'he-IL';

    const updateStatus = async (playbackStatus: AVPlaybackStatus) => {
        setPlaying((playbackStatus as AVPlaybackStatusSuccess).isPlaying);
    };

    const loadAndPlayAudio = async () => {
        try {
            await sound.unloadAsync();
            const result: AVPlaybackStatus = await sound.loadAsync({
                uri: `http://localhost:8084/tts?text="${text}"&gender=${gender}&languageCode=${languageCode}`
            });

            if ((result as AVPlaybackStatusError).error) {
                setPlaying(false);
                console.error('Error when loading Audio', (result as AVPlaybackStatusError).error);
            } else if (!result.isLoaded) {
                setPlaying(false);
                console.error('Error when loading Audio');
            } else {
                sound.setOnPlaybackStatusUpdate(updateStatus);
                setPlaying(true);
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