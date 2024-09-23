import React from "react";
import Loginheader from "@/app/Component/Home/loginheader";
import SignupComponent from "@/app/Component/Signup/signup";
import "../../globals.css";

const Signup = () => {
  return (
    <div>
      <Loginheader />
      <SignupComponent />
    </div>
  );
};

export default Signup;
