"use client";
import React from "react";
import Image from "next/image";
import logoTH from "../../../../public/Black & White Minimalist Busines.png";
import Link from "next/link";
const HomeComponent = () => {
  return (
    <main style={{ height: "100%" }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <div
            style={{
              color: "#000",
              background: "#fff",
              border: "5px solid",
              borderImage: "linear-gradient(to left,  #23e5db,#ffce32, red) 1",
              padding: "8px 5px 5px 5px ",
            }}
          >
            <Image src={logoTH} alt="Trade Hub Logo" width={555} height={225} />
            {/* <p
              style={{
                color: "blue",
                fontFamily: "sans-serif",
                fontWeight: "bold",

                margin: "0 auto 2px 4px",
              }}
            >
              <span style={{ color: "red" }}>Welcome To TRADE HUB || </span>
              <Link href="/Auth/Login">
                <span>Click ME! To Login</span>
              </Link>
              <span style={{ color: "red" }}> OR </span>
              <Link href="/Auth/Signup">
                <span>New here? Sign Up</span>
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
