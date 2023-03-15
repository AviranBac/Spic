import useTextToSpeech, { UseTextToSpeechOutput } from "../../hooks/useTextToSpeech";
import SpeakerSvgIcon from "./SpeakerSvgIcon";

type TextToSpeechIconProps = {
    text: string;
    gender: 'MALE' | 'FEMALE';
}

const TextToSpeechIcon = ({text, gender}: TextToSpeechIconProps): JSX.Element => {
    const {playing, loadAndPlayAudioFn}: UseTextToSpeechOutput = useTextToSpeech({text, gender});

    const pressHandler: () => void = async () => {
        await loadAndPlayAudioFn();
    }

    return <SpeakerSvgIcon playing={playing} onPress={pressHandler}/>;
};

export default TextToSpeechIcon;