import { Pressable, StyleProp, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";

type SpeakerIconProps = {
    playing: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    width?: number;
    height?: number;
}

const SpeakerSvgIcon = ({playing, onPress, style = {}, width = 30, height = 30}: SpeakerIconProps): JSX.Element => {
    const color: string = playing ? '#009dff' : 'black';

    return (
        <Pressable onPress={onPress} style={style}>
            <Svg width={width} height={height} viewBox='0 0 75 75'>
                <Path d='M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z'
                      stroke={color}
                      strokeWidth='5'
                      strokeLinejoin='round'
                      fill={color}/>
                <Path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                      stroke={color}
                      strokeWidth='5'
                      strokeLinecap='round'
                      fill='none'/>
            </Svg>
        </Pressable>
    );
};

export default SpeakerSvgIcon;