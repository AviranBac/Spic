import useTextToSpeech, { ReturnedValue } from "../../hooks/useTextToSpeech";
import SpeakerSvgIcon from "./SpeakerSvgIcon";

type TextToSpeechIconProps = {
    text: string;
    gender: 'MALE' | 'FEMALE';
}

const TextToSpeechIcon = ({text, gender }: TextToSpeechIconProps): JSX.Element => {
    const [playing, loadAndPlayAudio]: ReturnedValue = useTextToSpeech({ text, gender });

    const pressHandler = async () => {
        await loadAndPlayAudio();
    }

    return <SpeakerSvgIcon playing={playing} onPress={pressHandler} />;
};

export default TextToSpeechIcon;