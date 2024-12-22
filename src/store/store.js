import { configureStore , combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice.js';
import postSlice from './postSlice.js';
import profileSlice from './profileSlice.js';
import likeSlice from "./likeSlice.js";
import followSlice from "./followSlice.js";

const persistConfig = {
    key: 'auth',
    storage,
   
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const rootReducer = combineReducers({
    auth : persistedAuthReducer,
    posts : postSlice,
    profiles : profileSlice,
    likes : likeSlice,
    follows : followSlice,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
                ignoredPaths: ['auth.accessToken', 'auth.refreshToken'],
            },
        }),
    
  });

const persistor = persistStore(store);
export {store , persistor};
