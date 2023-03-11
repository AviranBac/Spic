import useTextToSpeech, { ReturnedValue } from "../../hooks/useTextToSpeech";
import SpeakerSvgIcon from "./SpeakerSvgIcon";

type TextToSpeechIconProps = {
    text: string;
    gender: 'MALE' | 'FEMALE';
}

const TextToSpeechIcon = ({text, gender }: TextToSpeechIconProps): JSX.Element => {
    const [playing, loadAndPlayAudio]: ReturnedValue = useTextToSpeech({ text, gender });
    const color = playing ? '#009dff' : 'black';

    const pressHandler = async () => {
        await loadAndPlayAudio();
    }

    return <SpeakerSvgIcon color={color} onPress={pressHandler} />;
};

export default TextToSpeechIcon;