"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Logout } from "./Redux/tradeSlice";
import Home from "./Auth/Home/page";
import "./globals.css";

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Home Page || Trade Hub";
    const token = Cookies.get("JWT");
    if (token) {
      dispatch(Logout());
    }
  }, [dispatch]);

  return (
    <main>
      <Home />
    </main>
  );
}
