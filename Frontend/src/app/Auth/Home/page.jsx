import HomeComponent from "@/app/Component/Home/home";
import Loginheader from "@/app/Component/Home/loginheader";
import React from "react";
import "../../globals.css";

const Home = () => {
  return (
    <main>
      <Loginheader />
      <HomeComponent />
    </main>
  );
};

export default Home;
