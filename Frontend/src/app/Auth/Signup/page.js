"use client";
import React, { useEffect } from "react";
import Loginheader from "@/app/Component/LoginHeader/loginheader";
import SignupComponent from "@/app/Component/Signup/signup";
import "../../globals.css";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Signup = () => {
  const router = useRouter();
  const user = useSelector((state) => state.trade.isLogin);
  useEffect(() => {
    document.title = `Sign Up Or Create A New Account || Trade Hub`;

    if (user) {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <Loginheader />
      <SignupComponent />
    </div>
  );
};

export default Signup;
