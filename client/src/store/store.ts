import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userSessionStorageKey = 'userSession';
const rootReducer = combineReducers({
    auth: persistReducer({ key: userSessionStorageKey, storage: AsyncStorage }, authReducer)
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