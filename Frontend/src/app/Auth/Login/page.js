"use client";
import React from "react";
import "../../globals.css";
import Loginheader from "@/app/Component/Home/loginheader";
import LoginComponent from "@/app/Component/Login/login";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
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
    <div>
      <Loginheader />
      <LoginComponent />
    </div>
  );
};

export default Login;
