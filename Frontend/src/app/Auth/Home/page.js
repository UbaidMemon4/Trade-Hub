"use client";
import HomeComponent from "@/app/Component/Home/home";
import Loginheader from "@/app/Component/Home/loginheader";
import React from "react";
import "../../globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    document.title = `Login Your Account || Trade Hub`;
    // const user = useSelector((state) => state.trade.Login);
    const user = Cookies.get("JWT");

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
