import React, {useEffect} from "react";
import {useAppDispatch} from "../../store/hooks";
import {logoutThunk} from "../../store/auth/auth.slice";
import {ImageWrapper, StyledAppBar, StyledIcon, StyledImage, Wrapper} from "./MainAppBarStyles";
import {ItemWithCategory} from "../../models/item";
import {getFavorites} from "../../services/favorites.service";
import {upsertFavoritesThunk} from "../../store/favorites/favorites.slice";
import {getUserDetails, UserDetails} from "../../services/user-settings.service";
import {updateUserDetailsThunk} from "../../store/user-details/user-details.slice";

const logo = require('../../../assets/logo-spic.png');
export const MainAppBar = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const favorites: ItemWithCategory[] = await getFavorites();
            const filteredFavorites: string[] = favorites?.map((item: { _id: string; }) => item._id);

            const userDetails: UserDetails = await getUserDetails();

            dispatch(upsertFavoritesThunk(filteredFavorites));
            dispatch(updateUserDetailsThunk(userDetails));
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