"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutHeader from "@/app/Component/UserView/logoutHeader";

const PostPage = () => {
  const [post, setpost] = useState(null);

  const router = useRouter();
  // const { id } = router.query;
  // console.log(id);
  const id = "";
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
      <div>
        <h1>It is Body : </h1>
      </div>
    </div>
  );
};

export default PostPage;
