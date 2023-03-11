import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

type SpeakerIconProps = {
    color?: string;
    width?: number;
    height?: number;
    [key: string]: any;
}

const SpeakerSvgIcon = ({color = 'black', width = 50, height = 50, ...props}: SpeakerIconProps): JSX.Element => (
    <View {...props}>
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
    </View>
);

export default SpeakerSvgIcon;