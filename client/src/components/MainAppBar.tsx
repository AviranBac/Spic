import React, {useEffect} from "react";
import {useAppDispatch} from "../store/hooks";
import {logoutThunk} from "../store/auth/auth.slice";
import {ImageWrapper, StyledAppBar, StyledIcon, StyledImage, Wrapper} from "../styles/MainAppBarStyles";
import {upsertFavoritesThunk} from "../store/favorites/favorites.slice";
import {getFavorites} from "../services/favorites.service";
import {Item} from "../models/item";

const logo = require('../../assets/logo-spic.png');
export const MainAppBar = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const favorites: Item[] = await getFavorites();
            const filteredFavorites: string[] = favorites.map((item: { _id: string; }) => item._id);
            dispatch(upsertFavoritesThunk(filteredFavorites));
        };
        fetchData();
    }, []);

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