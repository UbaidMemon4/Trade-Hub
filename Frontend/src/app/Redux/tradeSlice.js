import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLogin: false, userData: null };
const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    Login(state) {
      state.isLogin = true;
    },
    Logout(state) {
      state.userData = null;
      state.isLogin = false;
    },
    AddData(state, action) {
      state.userData = action.payload;
      console.log(state.userData, "User Data");
    },
  },
});
export const { Login, Logout, AddData } = tradeSlice.actions;
export default tradeSlice.reducer;
