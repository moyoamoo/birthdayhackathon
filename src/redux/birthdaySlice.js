import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
export const birthdaySlice = createSlice({
  name: "birthday",
  initialState,
  reducers: {
    addBirthday: (state, action) => {
      state.birthday = action.payload;
    },
  },
});

export const { addBirthday } = birthdaySlice.actions;

export const selectBirthday = (state) => state.birthday.birthday;
export const selectName = (state) => state.birthday.birthday.partnersName;
export const selectDate = (state) => state.birthday.birthday.bdayDate;
export const selectCategories = (state) => state.birthday.birthday.products;

export default birthdaySlice.reducer;
