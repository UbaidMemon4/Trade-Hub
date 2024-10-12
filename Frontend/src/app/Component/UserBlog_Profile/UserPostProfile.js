import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Button, Avatar, Card, Form, Input } from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import PostCard from "../Card/Card";

const UserPostProfile = () => {
  const token = Cookies.get("JWT");
  const [form] = Form.useForm();
  const { Meta } = Card;
  const [populatedUser, setPopulatedUser] = useState({});
  const [posts, setPosts] = useState([]);
  const userLogin = useSelector((state) => state.trade.userData);

  const onFinish = async (values) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/auth/update-profile/${populatedUser._id}`,
        {
          username: values.username,
          number: values.number,
        }
      );
      if (data.success) {
        toast.success("User Updated");
        setPopulatedUser({
          ...populatedUser,
          username: values.username,
          number: values.number,
        });
        form.setFieldsValue({
          username: values.username,
          number: values.number,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const getUserPosts = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/post/user-post/${populatedUser._id}`
      );
      if (data?.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      toast.error(
        "Post loading failed due to slow network or user has no posts."
      );
    }
  }, [populatedUser._id]);
  // Handle user login and fetching posts
  useEffect(() => {
    if (userLogin) {
      setPopulatedUser(userLogin);
      getUserPosts();
    }
  }, [userLogin, getUserPosts, setPopulatedUser]);

  // Handle populating the form when populatedUser is set
  useEffect(() => {
    if (populatedUser) {
      form.setFieldsValue({
        username: populatedUser.username,
        number: populatedUser.number,
      });
    }
  }, [populatedUser, form]);

  return (
    <div>
      <div className="mainProfile">
        <Card>
          <h1 className="profileCardHeading">User Info</h1>
          <Meta
            avatar={
              <Avatar className="profileAvatar">
                {populatedUser.username?.charAt(0)}
              </Avatar>
            }
            title={populatedUser.username}
          />
          <p>
            <b>Email:</b> {populatedUser.email}
          </p>
          <p>
            <b>Join Date:</b> {new Date(populatedUser.createdAt).toDateString()}
          </p>

          <div className="profileForm">
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
                label="Number"
                name="number"
                rules={[
                  {
                    required: true,
                    message: "Please input your number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  className="profileButton"
                  type="primary"
                  htmlType="submit"
                >
                  Update Profile Details
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
      <div>
        {posts.length ? (
          posts.map((post) => (
            <div onClick={() => PostMangement(post._id)} key={post._id}>
              <PostCard
                title={post?.title}
                description={post?.description}
                img={post?.img}
                isUser={token === post?.user?.token}
                id={post?._id}
              />
            </div>
          ))
        ) : (
          <div>
            <h1>No posts available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPostProfile;
