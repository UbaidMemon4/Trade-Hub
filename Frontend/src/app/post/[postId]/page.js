"use client";
import { useParams } from "next/navigation";
import React from "react";

const PostPage = () => {
  const param = useParams();
  console.log("param", param);

  return <div>PostPage</div>;
};

export default PostPage;
