import {Button, Image, TextBase, TouchableOpacity, View} from "react-native";
import {getImageByCategory} from "../Utils/getImageByCategory";
import {replaceEngToHeb} from "../Utils/replaceEngToHeb";

interface ClickableBoxProps {
    categoryName: string,
    subCategories: string[]
}

export const ClickableBox = ({categoryName, subCategories}: ClickableBoxProps) => {
    const image = getImageByCategory(categoryName);
    const title = replaceEngToHeb(categoryName);
    return (
        <View style={{flexBasis: '50%', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity>
                <Image source={image} style={{width: 150, height: 150}}/>
                <Button title={title}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={image} style={{width: 150, height: 150}}/>
                <Button title={title}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={image} style={{width: 150, height: 150}}/>
                <Button title={title}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={image} style={{width: 150, height: 150}}/>
                <Button title={title}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={image} style={{width: 150, height: 150}}/>
                <Button title={title}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={image} style={{width: 150, height: 150}}/>
                <Button title={title}/>
            </TouchableOpacity>
        </View>
    )
}