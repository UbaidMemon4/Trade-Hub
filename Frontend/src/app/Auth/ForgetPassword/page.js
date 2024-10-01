"use client";
import ForgetComponent from "@/app/Component/Forget/forget";
import Loginheader from "@/app/Component/Home/loginheader";
import React, { useEffect } from "react";
import "../../globals.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Forget = () => {
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
