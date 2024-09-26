"use client";
import ForgetComponent from "@/app/Component/Forget/forget";
import Loginheader from "@/app/Component/Home/loginheader";
import React from "react";
import "../../globals.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Forget = () => {
  const router = useRouter();

  useEffect(() => {
    document.title = `Login Your Account || Trade Hub`;
    const user = Cookies.get("JWT");
    // const user = useSelector((state) => state.trade.Login);

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
