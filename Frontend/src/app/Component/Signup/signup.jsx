"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./index.css";
import { Button, Flex, Form, Input, Modal, Typography } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

const introduce =
  "A trade hub is a central location where goods and services are exchanged between different regions, often serving as a key point in global supply chains. These hubs facilitate trade by offering infrastructure, logistics, and financial services to streamline the flow of goods, making them vital to international commerce.";
const SignupComponent = () => {
  const router = useRouter();
  const { Title } = Typography;

  const [user, setUser] = useState({
    firstname: "",
    email: "",
    password: "",
  });
  const [verificationOtp, setVerificationOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalClose = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setUser({
      username: values.username,
      email: values.email,
      password: values.password,
    });
    try {
      const { data } = await axios.post(
        // `${process.env.BASE_URL}/auth/register`,
        `http://localhost:3001/auth/register`,
        {
          email: values.email,
        }
      );
      if (data.success) {
        toast.success(data.message);
        setVerificationOtp(data.VerificationOtp);
        setIsModalOpen(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };
  const onChange = async (text) => {
    try {
      // const { data } = await axios.post(`${process.env.BASE_URL}/user/register-otp`, {
      const { data } = await axios.post(
        `http://localhost:3001/auth/register-otp`,
        {
          email: user?.email,
          username: user?.username,
          password: user?.password,
          VerificationOtp: verificationOtp,
          otp: Number(text),
        }
      );
      if (data.success) {
        toast.success(data.message);
        setIsModalOpen(false);
        router.push("/Auth/Login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };
  const sharedProps = {
    onChange,
  };
  return (
    <div className="sign-main">
      <div className="sign-side">
        <div className="sign-form">
          <div>
            <h1>Sign-Up</h1>
          </div>
          <div>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
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

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Verify
                </Button>
              </Form.Item>
              <Modal open={isModalOpen} onCancel={onModalClose} footer={null}>
                <Flex gap="middle" align="flex-start" vertical>
                  <Title level={3}>Email OTP Verification </Title>
                  <p>
                    The Verification email is : <b>{user.email}</b>
                  </p>
                  <div className="flex ">
                    <Input.OTP
                      length={4}
                      formatter={(str) => str.toUpperCase()}
                      {...sharedProps}
                    />
                  </div>
                </Flex>
              </Modal>
            </Form>
          </div>
        </div>
      </div>
      <div className="sign-introduce">
        <h1>Welcome To Trade Hub</h1>
        <p>{introduce}</p>
      </div>
    </div>
  );
};

export default SignupComponent;
