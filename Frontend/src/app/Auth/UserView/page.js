"use client";
import React from "react";
import { useEffect } from "react";
import LogoutHeader from "../../Component/UserView/logoutHeader";
import CategorySelection from "@/app/Component/UserView/categorySelection";
import Carousal from "@/app/Component/UserView/Carousal";
import Loginheader from "@/app/Component/LoginHeader/loginheader";
import { useSelector } from "react-redux";

const UserView = () => {
  const user = useSelector((state) => state.trade.isLogin);
  useEffect(() => {
    document.title = `Home || Trade Hub`;
  }, []);
  return (
    <div style={{ padding: "0 20px" }}>
      <div>{user ? <LogoutHeader /> : <Loginheader />}</div>
      <div>
        <Carousal />
      </div>
      <div>
        <CategorySelection />
      </div>
    </div>
  );
};

export default UserView;
