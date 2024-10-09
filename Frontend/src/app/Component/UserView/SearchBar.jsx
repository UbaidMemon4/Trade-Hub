import { Input } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import PostCard from "../Card/Card";

const SearchBar = () => {
  const [text, setText] = useState("");
  const [post, setPost] = useState();

  const inputEvent = async (event) => {
    const data = event.target.value;
    setText(data);
    try {
      const { data } = await axios.post(
        `http://localhost:3001/post/serch-post`,
        {
          text,
        }
      );
      if (data?.success) {
        setPost(data.posts);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div className="searchBar">
        <Input
          type="text"
          placeholder="Serach..."
          onChange={inputEvent}
          value={text}
        />
      </div>
      {post && post.length > 0
        ? post.map((postData) => {
            return (
              <div key={postData._id}>
                <PostCard
                  title={postData?.title}
                  description={postData?.description}
                  image={postData?.img}
                  isUser={Cookies.get("JWT") === postData?.user?.token}
                  id={postData?._id}
                />
              </div>
            );
          })
        : null}
    </>
  );
};

export default SearchBar;
