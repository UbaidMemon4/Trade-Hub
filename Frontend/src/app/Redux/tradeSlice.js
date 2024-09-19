import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const tradeSlice = createSlice({
  name: "trade",
  initialState: { isLogin: true },
  reducers: {
    Login(state) {
      state.isLogin = true;
    },
    Logout(state) {
      state.isLogin = false;
    },
  },
});
