"use client";
import React from "react";
import { Button } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import Link from "next/link";
import logoTH from "../../../../public/Black & White Minimalist Busines.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Loginheader = () => {
  const pathname = usePathname();

  return (
    <div
      style={{
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "60px",
      }}
    >
      {pathname === "/" ? (
        <div
          style={{
            fontSize: "23px",
            border: "5px solid",
            borderImage:
              "linear-gradient(to right, #ffce32, #23e5db, #3a77ff) 1",
            padding: "2px 4px",
            background: "white",
            fontFamily: "sans-serif",
            fontWeight: "bold",
          }}
        >
          <p>Unlock Opportunities At Trade Hub</p>
        </div>
      ) : (
        <Link href="/">
          <div>
            <Image src={logoTH} alt="Trade Hub Logo" width={105} height={36} />
          </div>
        </Link>
      )}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/Auth/Login">
          {pathname === "/Auth/Login" ? null : (
            <Button
              style={{
                width: 100,
                height: 40,
                color: "#000",
                background: "#fff",
                border: "5px solid",
                borderImage:
                  "linear-gradient(to right, #ffce32, #23e5db, #3a77ff) 1",
              }}
            >
              <LoginOutlined />
              Login
            </Button>
          )}
        </Link>
        <Link href="/Auth/Signup">
          {pathname === "/Auth/Signup" ? null : (
            <Button
              style={{
                width: 100,
                height: 40,
                color: "#000",
                background: "#fff",
                border: "5px solid",
                borderImage:
                  "linear-gradient(to right, #ffce32, #23e5db, #3a77ff) 1",
              }}
            >
              <UserAddOutlined />
              Sign Up
            </Button>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Loginheader;
