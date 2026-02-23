import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import { authSlice } from "./features/auth/authSlice";
import { apiSlice } from "./features/api/apiSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

/* ------------------ AUTH PERSIST CONFIG ------------------ */
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"], // ✅ persist ONLY user
};

/* ------------------ ROOT REDUCER ------------------ */
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  [apiSlice.reducerPath]: apiSlice.reducer,
});

/* ------------------ ROOT PERSIST CONFIG ------------------ */
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // ✅ cart persisted here
  blacklist: [apiSlice.reducerPath], // ❌ never persist RTK Query
};

/* ------------------ PERSISTED REDUCER ------------------ */
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

/* ------------------ STORE ------------------ */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

/* ------------------ PERSISTOR ------------------ */
export const persistor = persistStore(store);

/* ------------------ TYPES ------------------ */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
