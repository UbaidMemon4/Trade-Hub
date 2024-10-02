"use client";
import React from "react";
import { Button } from "antd";
import {
  LoginOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import logoTH from "../../../../public/Black & White Minimalist Busines.png";
import Image from "next/image";
import "./index.css";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Logout } from "@/app/Redux/tradeSlice";

const logoutHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const logoutFunction = () => {
    Cookies.remove("JWT");
    dispatch(Logout());

    router.push("/");
  };
  const profileFunction = () => {
    router.push("/Auth/Profile");
  };
  return (
    <div className="logoutHeaderMain">
      <Link href="/Auth/UserView">
        <div>
          <Image className="tradePhoto" src={logoTH} alt="Trade Hub Logo" />
        </div>
      </Link>
      <div>
        <div className="userViewHeaderButtons">
          {pathname === "/Auth/Profile" ? null : (
            <Button classNames="LogoutHeaderButton" onClick={profileFunction}>
              <UserOutlined />
              View Profile
            </Button>
          )}
          <Button classNames="LogoutHeaderButton">
            <PlusCircleOutlined />
            Add New Post
          </Button>
          <Button classNames="LogoutHeaderButton" onClick={logoutFunction}>
            <LoginOutlined />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default logoutHeader;
