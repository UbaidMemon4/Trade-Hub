"use client";
import React, { useEffect } from "react";
import LogoutHeader from "../../Component/UserView/logoutHeader";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const user = useSelector((state) => state.trade.isLogin);
  const userLogin = useSelector((state) => state.trade.userData);
  console.log("userLogin=>", userLogin);
  useEffect(() => {
    document.title = `Login Your Account || Trade Hub`;
    if (!user) {
      router.push("/Auth/Login");
    }
  }, [router]);
  return (
    <div className="profileMain">
      <div>
        <LogoutHeader />
      </div>
      <div>It is Body</div>
    </div>
  );
};

export default Profile;
