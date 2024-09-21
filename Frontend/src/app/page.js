"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Login } from "./Redux/tradeSlice";
import "./globals.css";
import Home from "./Auth/Home/page";

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Home Page || Trade Hub";
    const token = Cookies.get("JWT");
    if (token) {
      dispatch(Login());
    }
  }, [dispatch]);

  return (
    <main>
      <Home />
    </main>
  );
}
