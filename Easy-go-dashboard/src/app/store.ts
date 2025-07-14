import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import blogSlice from "../features/blogs/blogSlice";
import medicineSlice from "../features/medicines/medicineSlice";
import bookingSlice from "../features/orders/orderSlice";
import bannerSlice from "../features/banner/bannerSlice";
import mediatorSlice from "../features/mediator/mediatorSlice";
import categorySlice from "../features/category/categorySlice";

const rootReducer = combineReducers({
  user: userSlice,
  blog: blogSlice,
  medicine: medicineSlice,
  booking: bookingSlice,
  banner: bannerSlice,
  mediator: mediatorSlice,
  category: categorySlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
