import { configureStore } from "@reduxjs/toolkit";
import tradeSlice from "./tradeSlice";

const store = configureStore({
  reducer: {
    trade: tradeSlice,
  },
});

export default store;
