import React from "react";
import { Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Import icons
import toast from "react-hot-toast";
import axios from "axios";
import { EditId } from "@/app/Redux/tradeSlice";
import Image from "next/image";
const { Meta } = Card;

const PostCard = ({ title, description, img, isUser, id }) => {
  const handleEdit = (id) => {
    dispatch(EditId(id));
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/post/delete-post/${id}`
      );
      if (data?.success) {
        toast.success("Blog Deleted!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      actions={
        !isUser
          ? [
              <div key="delete" className="editDeleteButton">
                <DeleteOutlined onClick={handleDelete} />
                <EditOutlined key="edit" onClick={() => handleEdit(post.id)} />
              </div>,
            ]
          : null
      }
      cover={
        <Image
          alt="Post Image"
          src={
            img ||
            "https://plus.unsplash.com/premium_photo-1677094310956-7f88ae5f5c6b?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      }
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default PostCard;
