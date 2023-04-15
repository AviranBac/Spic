import { combineReducers, configureStore } from "@reduxjs/toolkit";
import audioReducer from './audio/audio.slice';
import authReducer from './auth/auth.slice';
import favoritesReducer from './favorites/favorites.slice';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserSessionService from "../services/user-session.service";

const rootReducer = combineReducers({
    audio: audioReducer,
    favorites: favoritesReducer,
    auth: persistReducer({ key: UserSessionService.storageKey, storage: AsyncStorage }, authReducer)
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;