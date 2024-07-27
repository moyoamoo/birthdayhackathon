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

export const selectBirthday = (state) => state.birthday;

export default birthdaySlice.reducer;
