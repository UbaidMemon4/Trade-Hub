"use client";
import "./index.css";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoutHeader from "../../Component/UserView/logoutHeader";
import CategorySelection from "@/app/Component/UserView/categorySelection";
import Carousal from "@/app/Component/UserView/Carousal";
import { useSelector } from "react-redux";

const UserView = () => {
  const router = useRouter();

  const user = useSelector((state) => state.trade.isLogin);
  useEffect(() => {
    document.title = `Home || Trade Hub`;

    if (!user) {
      router.push("/Auth/Login");
    }
  }, [router]);
  return (
    <div className="mainUserView">
      <div>
        <LogoutHeader />
      </div>
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
