import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../features/auth/authSlice";
import userSlice from "../features/users/userSlice";
import bikeRentSlice from "../features/bike-rent/bikeRentSlice";
import parcelSlice from "../features/parcel/parcelSlice";
import blogSlice from "../features/blog/blogSlice";
import medicineSlice from "../features/medicine/medicineSlice";
import mediatorSlice from "../features/mediator/mediatorSlice";
import cartSlice from "../features/MedicineCart/cartSlice";
import mediatorCartSlice from "../features/mediatorCart/mediatorCart";
import reviewSlice from "../features/review/reviewSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "cart", "mediatorCart"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  bikeRent: bikeRentSlice,
  parcel: parcelSlice,
  blog: blogSlice,
  medicine: medicineSlice,
  mediator: mediatorSlice,
  cart: cartSlice,
  mediatorCart: mediatorCartSlice,
  review: reviewSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
