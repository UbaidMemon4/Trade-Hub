// import React from "react";
// import { Carousel } from "antd";
// import Image from "next/image";

// const contentStyle = {
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };
// const Carousal = () => (
//   <Carousel autoplay>
//     <div>
//       <Image
//         src="https://images.olx.com.pk/thumbnails/489257159-800x600.webp"
//         alt="Trade Hub Logo"
//         style={contentStyle}
//       />
//     </div>
//   </Carousel>
// );
// export default Carousal;
import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

const Workplace =
  "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnVzaW5lc3MlMjBEZWFsJTIwb3IlMjBDb2xsYWJvcmF0aW9ufGVufDB8fDB8fHww";

const E_Commerce =
  "https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEUlMjBjb21tZXJjZSUyMENvbmNlcHR8ZW58MHx8MHx8fDA%3D";

const Unsplash =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3yPhC1Oigl9DxeRAyyae2kfldCXnbrgue4Q&s";

const contentStyle = {
  // height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Carousal = () => (
  <div className="caroudsalMainDiv">
    <Carousel autoplay>
      <div style={contentStyle}>
        <Image src={Workplace} alt="Workplace" width={1500} height={300} />
      </div>
      <div style={contentStyle}>
        <Image src={E_Commerce} alt="E-Commerce " width={1500} height={300} />
      </div>
      <div style={contentStyle}>
        <Image src={Unsplash} alt="Unsplash" width={1500} height={300} />
      </div>
    </Carousel>
  </div>
);

export default Carousal;
