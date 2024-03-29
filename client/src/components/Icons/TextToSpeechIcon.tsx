import useTextToSpeech, {UseTextToSpeechOutput} from "../../hooks/useTextToSpeech";
import SpeakerSvgIcon from "./SpeakerSvgIcon";
import {StyleProp, ViewStyle} from "react-native";
import {useEffect} from "react";
import {Gender} from "../../store/user-details/user-details.model";

type TextToSpeechIconProps = {
    text: string;
    gender: Gender;
    style?: StyleProp<ViewStyle>;
    initialPlay?: boolean;
    backgroundColor?: string;
}

const TextToSpeechIcon = ({
                              text,
                              gender,
                              style,
                              initialPlay = false,
                              backgroundColor = '#f2f2f2'
                          }: TextToSpeechIconProps): JSX.Element => {
    const {loading, playing, loadAndPlayAudioFn, forceStopFn}: UseTextToSpeechOutput = useTextToSpeech({text, gender});

    const pressHandler: () => void = async () => {
        await loadAndPlayAudioFn();
    }

    useEffect(() => {
        initialPlay ? pressHandler() : forceStopFn();
    }, [initialPlay]);

    return <SpeakerSvgIcon loading={loading} playing={playing} onPress={pressHandler} style={style}
                           backgroundColor={backgroundColor}/>;
};

export default TextToSpeechIcon;