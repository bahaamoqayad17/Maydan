import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootSlice";

export const store = configureStore({
  reducer: {
    root: RootReducer,
  },
});
