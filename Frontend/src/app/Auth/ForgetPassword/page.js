"use client";
import ForgetComponent from "@/app/Component/Forget/forget";
import Loginheader from "@/app/Component/LoginHeader/loginheader";
import React, { useEffect } from "react";
import "../../globals.css";
import { useRouter } from "next/navigation";

const Forget = () => {
  const router = useRouter();
  const user = useSelector((state) => state.trade.isLogin);

  useEffect(() => {
    document.title = `Login Your Account || Trade Hub`;

    if (user) {
      router.push("/Auth/Login");
    }
  }, [router, user]);

  return (
    <div>
      <div>
        <Loginheader />
      </div>
      <div>
        <ForgetComponent />
      </div>
    </div>
  );
};

export default Forget;
