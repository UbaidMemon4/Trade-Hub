"use client";
import React from "react";
import LogoutHeader from "../../Component/UserView/logoutHeader";
import CategorySelection from "@/app/Component/UserView/categorySelection";
import Carousal from "@/app/Component/UserView/Carousal";
import Loginheader from "@/app/Component/LoginHeader/loginheader";
import { useSelector } from "react-redux";
import SearchBar from "@/app/Component/UserView/SearchBar";
import "../../globals.css";
const UserView = () => {
  const user = useSelector((state) => state.trade.isLogin);

  return (
    <div style={{ padding: "0 20px" }}>
      <div>{user ? <LogoutHeader /> : <Loginheader />}</div>
      {user ? (
        <div>
          <SearchBar />
        </div>
      ) : null}
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
