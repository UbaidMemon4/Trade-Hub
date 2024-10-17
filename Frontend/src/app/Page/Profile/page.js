"use client";
import React, { useEffect } from "react";
import LogoutHeader from "../../Component/UserView/logoutHeader";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import UserPostProfile from "../../Component/UserPost_Profile/UserPostProfile";

const Profile = () => {
  const router = useRouter();
  const user = useSelector((state) => state.trade.isLogin);

  useEffect(() => {
    document.title = `Login Your Account || Trade Hub`;
    if (!user) {
      router.push("/Auth/Login");
    }
  }, [router, user]);
  return (
    <div className="profileMain">
      <div>
        <LogoutHeader />
      </div>
      <div>
        <UserPostProfile />
      </div>
    </div>
  );
};

export default Profile;
