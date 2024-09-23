"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Login } from "./Redux/tradeSlice";
import "./globals.css";
import Home from "./Auth/Home/page";
import { useRouter } from "next/navigation";

export default function Main() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    document.title = "Home Page || Trade Hub";
    const token = Cookies.get("JWT");
    if (token) {
      dispatch(Login());
      router.push("/Auth/UserView");
    }
  }, [dispatch]);

  return (
    <main>
      <Home />
    </main>
  );
}
