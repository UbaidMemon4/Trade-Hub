"use client";
import React from "react";
import Loginheader from "@/app/Component/Home/loginheader";
import SignupComponent from "@/app/Component/Signup/signup";
import "../../globals.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Signup = () => {
  const router = useRouter();
  useEffect(() => {
    document.title = `Sign Up Or Create A New Account || Trade Hub`;
    // const user = useSelector((state) => state.trade.Login);
    const user = Cookies.get("JWT");

    if (user) {
      router.push("/Auth/UserView");
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
