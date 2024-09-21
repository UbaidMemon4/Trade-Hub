import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLogin: false };
const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    Login(state) {
      state.isLogin = true;
    },
    Logout(state) {
      state.isLogin = false;
    },
  },
});
export const { Login, Logout } = tradeSlice.actions;
export default tradeSlice.reducer;
