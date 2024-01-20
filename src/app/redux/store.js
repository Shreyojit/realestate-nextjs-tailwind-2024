"use client"
// import userReducer from './userSlice'
// import { combineReducers, configureStore } from '@reduxjs/toolkit';

// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const rootReducer = combineReducers({ user: userReducer });

// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);



















// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import userSlice from "./userSlice";

// const persistConfig = {
//     key: "root",
//     version: 1,
//     storage,
// };

// const reducers = combineReducers({
//     user: userSlice,
// })

// const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// });

// export let persistor = persistStore(store);





















// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice";


// //create a store and give it reducers
// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//   },
// });



import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);