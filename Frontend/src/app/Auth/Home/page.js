"use client";
import HomeComponent from "@/app/Component/Home/home";
import Loginheader from "@/app/Component/Home/loginheader";
import React from "react";
import "../../globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Home = () => {
  const router = useRouter();
  const user = useSelector((state) => state.trade.isLogin);

  useEffect(() => {
    document.title = `Login Your Account || Trade Hub`;
    if (user) {
      router.push("/Auth/UserView");
    }
  }, [router]);
  return (
    <main>
      <Loginheader />
      <HomeComponent />
    </main>
  );
};

export default Home;
