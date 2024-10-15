// "use client";
// import "../../globals.css";
// import "./index.css";
// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import LogoutHeader from "@/app/Component/UserView/logoutHeader";
// import { Avatar, Card } from "antd";
// import Image from "next/image";

// const PostPage = () => {
//   const [post, setpost] = useState(null);
//   const { Meta } = Card;
//   const id = useParams();
//   const tempImg =
//     "https://plus.unsplash.com/premium_photo-1677094310956-7f88ae5f5c6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D";
//   const getPostById = async () => {
//     try {
//       const { data } = await axios.post(
//         `http://localhost:3001/post/id-post/${id}`,
//         { id }
//       );
//       if (data.success) {
//         setpost(data.populatedPost);
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "An error occurred. Please try again.";
//       toast.error(errorMessage);
//     }
//   };
//   useEffect(() => {
//     document.title = `Post Detail || Trade Hub`;
//     getPostById();
//   }, [getPostById]);

//   return (
//     <div>
//       <div>
//         <LogoutHeader />
//       </div>
//       <div className="postPage">
//         <div>
//           <Image
//             src={post?.img || tempImg}
//             alt="image"
//             width={700}
//             height={450}
//           />
//         </div>
//         <div>
//           <Card className="postCard">
//             <h1>POST DETAIL</h1>
//             <br />
//             <h3>Title : {post?.title}</h3>
//             <h3>Description : {post?.descriptio}</h3>
//             <h3>Category : {post?.category}</h3>
//             <h3>Location : {post?.location}</h3>
//           </Card>
//         </div>
//         <div>
//           <Card className="postCard">
//             <h1>USER DETAIL</h1>
//             <br />
//             <Meta
//               avatar={
//                 <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
//               }
//               title="User Name : "
//               description="User Number : "
//             />
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostPage;

"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Button, Avatar, Card, Form, Input } from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import PostCard from "@/app/Component/Card/Card";

const UserPostProfile = () => {
  const token = Cookies.get("JWT");
  const [form] = Form.useForm();
  const { Meta } = Card;
  const [populatedUser, setPopulatedUser] = useState({});
  const [posts, setPosts] = useState([]);
  const userLogin = useSelector((state) => state.trade.userData);

  // Function to handle form submission and user profile update
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

  // Fetch posts by the user
  const getUserPosts = useCallback(async () => {
    if (!populatedUser._id) return;
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

  // Handle setting populatedUser when userLogin changes
  useEffect(() => {
    if (userLogin && userLogin._id !== populatedUser._id) {
      setPopulatedUser(userLogin);
    }
  }, [userLogin, populatedUser._id]);

  // Fetch posts when populatedUser is set
  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

  // Populate form fields with user data when populatedUser is set
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
