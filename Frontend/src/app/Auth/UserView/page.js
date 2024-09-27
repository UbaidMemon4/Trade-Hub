"use client";
import "./index.css";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LogoutHeader from "../../Component/LogoutHeader/logoutHeader";

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
        <h1>It is Body Part</h1>
      </div>
    </div>
  );
};

export default UserView;
