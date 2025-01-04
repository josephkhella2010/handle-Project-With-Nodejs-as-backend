
import { configureStore } from "@reduxjs/toolkit";
import CountSlice from "../reducer/CountSlice";
import LanguageSlice from "../reducer/LanguageSlice"; 
import LoginSlice from "../reducer/LoginSlice";
import CartSlice from "../reducer/CartSlice";

const store = configureStore({
  reducer: {
    countes: CountSlice, 
    language: LanguageSlice, 
    login:LoginSlice,
    cart:CartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
