"use client";
import "./index.css";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const page = () => {
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
        <logoutHeader />
      </div>
      <div></div>
    </div>
  );
};

export default page;
