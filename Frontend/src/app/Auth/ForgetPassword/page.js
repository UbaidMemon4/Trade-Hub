import ForgetComponent from "@/app/Component/Forget/forget";
import Loginheader from "@/app/Component/Home/loginheader";
import React from "react";
import "../../globals.css";

const Forget = () => {
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
