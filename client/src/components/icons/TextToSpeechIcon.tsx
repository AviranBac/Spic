import useTextToSpeech, { UseTextToSpeechOutput } from "../../hooks/useTextToSpeech";
import SpeakerSvgIcon from "./SpeakerSvgIcon";
import { Gender } from "../../store/auth/auth.model";
import { StyleProp, ViewStyle } from "react-native";

type TextToSpeechIconProps = {
    text: string;
    gender: Gender;
    style?: StyleProp<ViewStyle>;
}

const TextToSpeechIcon = ({text, gender, style}: TextToSpeechIconProps): JSX.Element => {
    const {playing, loadAndPlayAudioFn}: UseTextToSpeechOutput = useTextToSpeech({text, gender});

    const pressHandler: () => void = async () => {
        await loadAndPlayAudioFn();
    }

    return <SpeakerSvgIcon playing={playing} onPress={pressHandler} style={style} />;
};

export default TextToSpeechIcon;