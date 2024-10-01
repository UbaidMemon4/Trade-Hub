"use client";
import { useRouter } from "next/navigation";
import "./index.css";
import { Button, Form, Input } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Link from "next/link";

const introduce =
  "A trade hub is a central location where goods and services are exchanged between different regions, often serving as a key point in global supply chains. These hubs facilitate trade by offering infrastructure, logistics, and financial services to streamline the flow of goods, making them vital to international commerce.";
const LoginComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(`http://localhost:3001/auth/login`, {
        email: values.email,
        password: values.password,
      });
      if (data.success) {
        toast.success(data.message);
        router.push("/");
        Cookies.set("JWT", data.token);
        dispatch(authAction.Login);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-main">
      <div className="login-side">
        <div className="login-form">
          <div>
            <h1>Login</h1>
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
                style={{ margin: 0 }}
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
                <Link href="/Auth/ForgetPassword">
                  <p
                    style={{
                      color: "blue",
                    }}
                  >
                    Forget Password
                  </p>
                </Link>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div className="login-introduce">
        <h1>Welcome To Trade Hub</h1>
        <p>{introduce}</p>
      </div>
    </div>
  );
};

export default LoginComponent;
