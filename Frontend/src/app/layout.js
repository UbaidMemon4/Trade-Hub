"use client";
import { Provider } from "react-redux";
import store from "./Redux/Store";

export default function AppWrapper({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Provider>
  );
}
