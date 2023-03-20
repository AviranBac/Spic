import {Button, TouchableOpacity} from "react-native";
import {getImageByCategory} from "../Utils/getImageByCategory";
import {replaceEngToHeb} from "../Utils/replaceEngToHeb";
import styled from "styled-components/native";

interface ClickableBoxProps {
    categoryName: string
}

const Wrapper = styled.View`
  flex-basis: 50%;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.Image`
  width: 150px;
  height: 150px;
`

export const ClickableBox = ({categoryName}: ClickableBoxProps) => {
    const image = getImageByCategory(categoryName);
    const title = replaceEngToHeb(categoryName);
    return (
        <Wrapper>
            <TouchableOpacity>
                <StyledImage source={image}/>
                <Button title={title}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <StyledImage source={image}/>
                <Button title={title}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <StyledImage source={image}/>
                <Button title={title}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <StyledImage source={image}/>
                <Button title={title}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <StyledImage source={image}/>
                <Button title={title}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <StyledImage source={image}/>
                <Button title={title}/>
            </TouchableOpacity>
        </Wrapper>
    )
}