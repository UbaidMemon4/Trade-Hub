"use client";
import React from "react";
import Image from "next/image";
import logoTH from "../../../../public/Black & White Minimalist Busines.png";
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
