"use client";
import React from "react";
import "../../globals.css";
import Loginheader from "@/app/Component/Home/loginheader";
import LoginComponent from "@/app/Component/Login/login";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();

  const user = useSelector((state) => state.trade.isLogin);
  useEffect(() => {
    document.title = `Login Your Account || Trade Hub`;

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
