"use client";
import "./index.css";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LogoutHeader from "../../Component/UserView/logoutHeader";
import CategorySelection from "@/app/Component/UserView/categorySelection";
import Carousal from "@/app/Component/UserView/Carousal";
import CategoryWithCard from "@/app/Component/UserView/categoryWithCard";

const UserView = () => {
  const router = useRouter();

  useEffect(() => {
    document.title = `Home || Trade Hub`;
    // const user = useSelector((state) => state.trade.Login);
    const user = Cookies.get("JWT");

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
      <div>
        <CategoryWithCard />
      </div>
    </div>
  );
};

export default UserView;
