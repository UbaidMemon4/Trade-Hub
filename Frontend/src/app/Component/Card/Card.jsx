import React from "react";
import { Card } from "antd";
const { Meta } = Card;
const PostCard = (card) => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={
      <img
        alt="example"
        // src={card.img}
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
    {/* <Meta title={card.title} description={card.description} /> */}
  </Card>
);
export default PostCard;
