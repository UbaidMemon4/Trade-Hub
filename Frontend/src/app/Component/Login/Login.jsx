import React, { useState } from "react";
import { Button, Modal, message, Space } from "antd";
import { PlusOutlined, LoginOutlined } from "@ant-design/icons";

import Image from "next/image";
import logoTH from "../../../../public/Black & White Minimalist Busines.png";

const login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Kindly Login First",
    });
    setIsModalOpen(true);
  };

  return (
    <main style={{ height: "100%" }}>
      <div
        style={{
          padding: "5px ",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "60px",
        }}
      >
        <div>
          <Image src={logoTH} alt="Trade Hub Logo" width={90} height={32} />
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Button
            style={{
              width: 90,
              height: 40,
              color: "#000",
              background: "#fff",
              border: "5px solid",
              borderImage:
                "linear-gradient(to right, #ffce32, #23e5db, #3a77ff) 1",
            }}
            onClick={showModal}
          >
            <LoginOutlined />
            Login
          </Button>

          <Modal
            title="Login || Signup New User"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <p>Some contents...</p>
          </Modal>
          {contextHolder}
          <Button
            onClick={error}
            style={{
              width: 90,
              height: 40,
              color: "#000",
              background: "#fff",
              border: "5px solid",
              borderImage:
                "linear-gradient(to right, #ffce32, #23e5db, #3a77ff) 1",
            }}
          >
            <PlusOutlined />
            Sell
          </Button>
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75vh",
          }}
        >
          <div
            style={{
              color: "#000",
              background: "#fff",
              border: "5px solid",
              borderImage: "linear-gradient(to left,  #23e5db,#ffce32, red) 1",
            }}
          >
            <Image src={logoTH} alt="Trade Hub Logo" width={550} height={220} />
            <p
              style={{
                color: "blue",
                fontFamily: "sans-serif",
                fontWeight: "bold",

                margin: "0 auto 0 4px",
              }}
            >
              <span style={{ color: "red" }}>Welcome To TRADE HUB ||</span>
              <span
                onClick={showModal}
                style={{ cursor: "pointer", marginLeft: "2px" }}
              >
                Click To Login OR Create New Account.!!
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default login;
