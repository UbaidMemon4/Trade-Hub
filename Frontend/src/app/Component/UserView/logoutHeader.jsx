"use client";
import React from "react";
import { Button } from "antd";
import { LoginOutlined, PlusCircleTwoTone } from "@ant-design/icons";
import Link from "next/link";
import logoTH from "../../../../public/Black & White Minimalist Busines.png";
import Image from "next/image";
import "./index.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Logout } from "@/app/Redux/tradeSlice";

const logoutHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const logoutFunction = () => {
    Cookies.remove("JWT");
    dispatch(Logout());

    router.push("/Auth/Home");
  };
  return (
    <div className="logoutHeaderMain">
      <Link href="/Auth/UserView">
        <div>
          <Image className="tradePhoto" src={logoTH} alt="Trade Hub Logo" />
        </div>
      </Link>
      <div>
        <div>
          <Button classNames="LogoutHeaderButton">
            <PlusCircleTwoTone />
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
