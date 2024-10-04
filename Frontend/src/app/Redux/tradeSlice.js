import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLogin: false, userData: null, postEditId: "" };
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
    },
    EditId(state, action) {
      state.postEditId = action.payload;
    },
  },
});
export const { Login, Logout, AddData, EditId } = tradeSlice.actions;
export default tradeSlice.reducer;
