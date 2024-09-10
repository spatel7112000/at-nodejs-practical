import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "../Slice/authSlice";
import registration from "../Slice/registration";
import profile from "../Slice/profileSlice";
import {
    persistReducer, persistStore,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
    key: 'auth-sdemo',
    version: 1.1,
    storage,
    whitelist: ['auth'] // only persist the auth slice
};
export const rootReducerData = combineReducers({
    // ...rootReducer,
    auth: auth,
    registration: registration,
    profile: profile,
});
const persistedReducer = persistReducer(authPersistConfig, rootReducerData);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            // serializableCheck: false,
        }),
});

const persistor = persistStore(store);
export { store, persistor };