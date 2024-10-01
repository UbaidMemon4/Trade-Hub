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

const CategorySelection = () => {
  const [posts, setposts] = useState({});
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
            console.log("post", post);
            return (
              <div key={post._id}>
                <PostCard
                  title={post?.title}
                  description={post?.description}
                  image={post?.img}
                />
              </div>
            );
          })
        ) : (
          <div>
            <h1>Tap a category to see more related posts.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelection;
