import React from "react";
import { Card } from "antd";
const { Meta } = Card;

const PostCard = (card) => {
  console.log(card);

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="example" src={card.img} />}
    >
      <Meta title={card.title} description={card.description} />
    </Card>
  );
};

export default PostCard;
