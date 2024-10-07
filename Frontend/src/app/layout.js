"use client";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import store from "./Redux/Store";
import Cookies from "js-cookie";
import { Login } from "./Redux/tradeSlice";

function AppContent({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = Cookies.get("JWT");

    if (user) {
      dispatch(Login());
    }
  }, [dispatch, user]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default function AppWrapper({ children }) {
  return (
    <Provider store={store}>
      <AppContent>{children}</AppContent>
    </Provider>
  );
}
