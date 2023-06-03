import React, {useEffect} from "react";
import {useAppDispatch} from "../../store/hooks";
import {logoutThunk} from "../../store/auth/auth.slice";
import {ImageWrapper, StyledAppBar, StyledIcon, StyledImage, Wrapper} from "./MainAppBarStyles";
import {ItemWithCategory} from "../../models/item";
import {getFavorites} from "../../services/favorites.service";
import {upsertFavoritesThunk} from "../../store/favorites/favorites.slice";
import {getUserDetails, UserDetails} from "../../services/user-settings.service";
import {updateUserDetailsThunk} from "../../store/user-details/user-details.slice";
import Toast from "react-native-toast-message";

const logo = require('../../../assets/logo-spic.png');

export const MainAppBar = () => {
    const dispatch = useAppDispatch();
    const logoutHandler = () => {
        dispatch(logoutThunk());
    };

    useEffect(() => {
        const fetchData = async () => {
            const favorites: ItemWithCategory[] = await getFavorites();
            const filteredFavorites: string[] = favorites?.map((item: { _id: string; }) => item._id);
            try {
                const userDetails: UserDetails = await getUserDetails();
                dispatch(updateUserDetailsThunk(userDetails));
            } catch (e) {
                Toast.show({
                    type: 'error',
                    text1: 'טעינת הפרטים נכשלה 🚫',
                    text2: 'אנא נסה שוב 🔄',
                });
                logoutHandler();
            }
            dispatch(upsertFavoritesThunk(filteredFavorites));
        };
        fetchData();
    }, []);

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