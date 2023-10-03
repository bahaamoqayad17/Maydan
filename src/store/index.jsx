import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootSlice";
import UserSlice from "./UserSlice";
import MessageSlice from "./MessageSlice";
import CategorySlice from "./CategorySlice";
import AdSlice from "./AdSlice";

export const store = configureStore({
  reducer: {
    root: RootReducer,
    users: UserSlice,
    messages: MessageSlice,
    categories: CategorySlice,
    ads: AdSlice,
  },
});
