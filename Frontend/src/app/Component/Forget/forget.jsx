"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./index.css";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

const introduce =
  "A trade hub is a central location where goods and services are exchanged between different regions, often serving as a key point in global supply chains. These hubs facilitate trade by offering infrastructure, logistics, and financial services to streamline the flow of goods, making them vital to international commerce.";

const ForgetComponent = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/auth/forget-password`,
        { email: values.email }
      );
      if (data.success) {
        toast.success(data.message);
        setUserEmail(values.email);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  const onChange = async (values) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/auth/new-password`,
        { email: userEmail, password: values.password, otp: values.otp }
      );
      if (data.success) {
        toast.success(data.message);
        router.push("/Auth/Login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="forget-main">
      <div className="forget-side">
        <div className="forget-form">
          {!userEmail ? (
            <div>
              <h1>Forget Password</h1>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Send OTP
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <div>
              <h1>Change Password</h1>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onChange}
                autoComplete="off"
              >
                <Form.Item
                  label="OTP"
                  name="otp"
                  rules={[
                    {
                      required: true,
                      message: "Please input your otp!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Verify
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </div>
      <div className="forget-introduce">
        <h1>Welcome To Trade Hub</h1>
        <p>{introduce}</p>
      </div>
    </div>
  );
};

export default ForgetComponent;
