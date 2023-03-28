import React from "react";
import {useAppDispatch} from "../store/hooks";
import {logoutThunk} from "../store/auth/auth.slice";
import {ImageWrapper, StyledAppBar, StyledIcon, StyledImage, Wrapper} from "../styles/MainAppBarStyles";

const logo = require('../../assets/logo-spic.png');
export const MainAppBar = () => {
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logoutThunk());
    };

    return (
        <StyledAppBar>
            <Wrapper>
                <ImageWrapper>
                    <StyledImage source={logo}/>
                </ImageWrapper>
                <StyledIcon name="logout" color="black" size={25} onPress={logoutHandler}/>
            </Wrapper>
        </StyledAppBar>
    );
}

export default MainAppBar;