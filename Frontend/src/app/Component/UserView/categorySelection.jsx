"use client";
import React, { useState } from "react";
import {
  MobileTwoTone,
  CarTwoTone,
  BugTwoTone,
  EditTwoTone,
  DashboardTwoTone,
  SkinTwoTone,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import axios from "axios";
import PostCard from "../Card/Card";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

const CategorySelection = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [posts, setposts] = useState({});
  const user = useSelector((state) => state.trade.isLogin);
  const PostMangement = async (category) => {
    console.log("category", category);

    if (user) {
    } else {
      setVisible(true);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const onFinish = async (category) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/post/category-post`,
        { category }
      );
      if (data.success) {
        setposts(data.posts);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="categoryMain">
      <div>
        <h1>All categories</h1>
      </div>

      <div className="CategoryOption">
        <div>
          <div className="categoryIcon" onClick={() => onFinish("Mobiles")}>
            <MobileTwoTone />
          </div>
          <div className="categoryName">
            <p>Mobiles</p>
          </div>
        </div>
        <div>
          <div className="categoryIcon" onClick={() => onFinish("Vehicles")}>
            <CarTwoTone />
          </div>
          <div className="categoryName">
            <p>Vehicles</p>
          </div>
        </div>

        <div>
          <div className="categoryIcon" onClick={() => onFinish("Animals")}>
            <BugTwoTone />
          </div>
          <div className="categoryName">
            <p>Animals</p>
          </div>
        </div>
        <div>
          <div className="categoryIcon" onClick={() => onFinish("Books")}>
            <EditTwoTone />
          </div>
          <div className="categoryName">
            <p>Books</p>
          </div>
        </div>
        <div>
          <div className="categoryIcon" onClick={() => onFinish("Sports")}>
            <DashboardTwoTone />
          </div>
          <div className="categoryName">
            <p>Sports</p>
          </div>
        </div>
        <div>
          <div className="categoryIcon" onClick={() => onFinish("Dress")}>
            <SkinTwoTone />
          </div>
          <div className="categoryName">
            <p>Dress</p>
          </div>
        </div>
      </div>
      <div className="PostCard">
        {posts && posts.length > 0 ? (
          posts.map((post) => {
            return (
              <div onClick={PostMangement} key={post._id}>
                <PostCard
                  title={post?.title}
                  description={post?.description}
                  image={post?.img}
                  isUser={Cookies.get("JWT") === post?.user?.token}
                  id={post?._id}
                />
              </div>
            );
          })
        ) : (
          <div>
            <h1>Tap a category to see more related posts.</h1>
          </div>
        )}
        <Modal visible={visible} footer={null} onCancel={handleCancel}>
          <p className="modalCategoryParagrafh">
            Choose an option below to log in with an existing account or create
            a new one.
          </p>
          <div className="modalCategoryButtons">
            <Link href="/Auth/Signup">
              <Button className="modalCategoryButton">Signup</Button>
            </Link>
            <Link href="/Auth/Login">
              <Button className="modalCategoryButton">Login</Button>
            </Link>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CategorySelection;
