"use client";
import "../../globals.css";
import "./index.css";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import LogoutHeader from "@/app/Component/UserView/logoutHeader";
import { Avatar, Card } from "antd";
import Image from "next/image";

const PostPage = () => {
  const [post, setpost] = useState(null);
  const { Meta } = Card;
  const id = useParams();
  const tempImg =
    "https://plus.unsplash.com/premium_photo-1677094310956-7f88ae5f5c6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D";
  const getPostById = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/post/id-post/${id}`,
        { id }
      );
      if (data.success) {
        setpost(data.populatedPost);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    document.title = `Selected Page || Trade Hub`;
    // getPostById()
  }, []);

  return (
    <div>
      <div>
        <LogoutHeader />
      </div>
      <div className="postPage">
        <div>
          <Image
            src={post?.img || tempImg}
            alt="image"
            width={700}
            height={450}
          />
        </div>
        <div>
          <Card className="postCard">
            <h1>POST DETAIL</h1>
            <br />
            <h3>Title : {post?.title}</h3>
            <h3>Description : {post?.descriptio}</h3>
            <h3>Category : {post?.category}</h3>
            <h3>Location : {post?.location}</h3>
          </Card>
        </div>
        <div>
          <Card className="postCard">
            <h1>USER DETAIL</h1>
            <br />
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title="User Name : "
              description="User Number : "
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
