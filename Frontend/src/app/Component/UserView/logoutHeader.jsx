"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import {
  LoginOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import logoTH from "../../../../public/Black & White Minimalist Busines.png";
import Image from "next/image";
import "./index.css";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "@/app/Redux/tradeSlice";
import toast from "react-hot-toast";
import axios from "axios";

const LogoutHeader = () => {
  const postEditId = useSelector((state) => state.trade.postEditId);

  const [input, setInput] = useState({});
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const token = Cookies.get("JWT");
  const getBlogDetailForEdit = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/post/get-post/${postEditId}`
      );
      if (data?.success) {
        setVisible(true);
        setInput({
          title: data?.post?.title,
          img: data?.post?.img,
          id: data?.post?._id,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const onFinish = async (values) => {
    try {
      console.log(values);
      const { data } = await axios.post(
        `http://localhost:3001/post/create-post`,
        {
          title: values.title,
          description: values.description,
          category: values.category,
          img: values.img,
          modal: values.modal,
          location: values.location,
          token: token,
        }
      );

      if (data.success) {
        console.log("data", data);
        toast.success("Blog Created");
        setVisible(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while creating the post."
      );
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const logoutFunction = () => {
    Cookies.remove("JWT");
    dispatch(Logout());

    router.push("/");
  };
  const profileFunction = () => {
    router.push("/Page/Profile");
  };
  const onFinishEdit = async (values) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/postupdate-blog/${input.id}`,
        {
          title: values.title,
          description: values.description,
          category: values.category,
          img: values.img,
          modal: values.modal,
          location: values.location,
        }
      );
      if (data.success) {
        toast.success("Blog Updated ");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (postEditId) {
      getBlogDetailForEdit, postEditId();
    }
  }, [getBlogDetailForEdit]);
  let formFunction = input.id ? onFinishEdit : onFinish;

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
          <Button
            onClick={() => setVisible(true)}
            className="LogoutHeaderButton"
          >
            <PlusCircleOutlined />
            Add New Post
          </Button>

          <Button classNames="LogoutHeaderButton" onClick={logoutFunction}>
            <LoginOutlined />
            Logout
          </Button>
        </div>
        <Modal open={visible} footer={null} onCancel={handleCancel}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={formFunction}
            autoComplete="off"
          >
            <Form.Item
              style={{ marginTop: "4px" }}
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please input your title!",
                },
              ]}
            >
              <Input value={input.title} placeholder="Title " />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <Input value={input.description} placeholder="description " />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please input your category!",
                },
              ]}
            >
              <Select value={input.category} placeholder="Select a category">
                <Option value="Mobiles">Mobiles</Option>
                <Option value="Vehicles">Vehicles</Option>
                <Option value="Animals">Animals</Option>
                <Option value="Books">Books</Option>
                <Option value="Sports">Sports</Option>
                <Option value="Dress">Dress</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              rules={[
                {
                  required: true,
                  message: "Please input your location!",
                },
              ]}
            >
              <Input value={input.location} placeholder="Location " />
            </Form.Item>
            <Form.Item label="Image (Optional)" name="img">
              <Upload listType="picture-card" accept=".png" maxCount={1}>
                <button type="button">
                  Add
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button className="" type="primary" htmlType="submit">
                {input.id ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default LogoutHeader;
