import { configureStore } from "@reduxjs/toolkit";
import birthdayReducer from "./birthdaySlice";

export const store = configureStore({
  reducer: {
    birthday: birthdayReducer,
  },
});
