import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import {ReactComponent as RightArrowSvg} from "../../assests/svg/RightSvg.svg";
import {ReactComponent as LeftArrowSvg} from "../../assests/svg/leftSvg.svg";
import img1 from "../../assests/images/pupg.jpg";
import img2 from "../../assests/images/gta.jpg";
import img3 from "../../assests/images/pupg2.jpeg";
import img4 from "../../assests/images/pupg.jpg";
import img5 from "../../assests/images/GarenaWorld.png";

import "./Slider.css"
import { borderColor } from "@mui/system";

function Slider() {
  const [value, setValue] = React.useState(5);
  const [image] = React.useState([
    img1,img2,img3,img4,img5
  ]);
  const [description] = React.useState([
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi",
    "deserunt voluptatibus quae iure, earum repudiandae officiis sit dolo",
    "illo doloribus dolorem tempore voluptas illum magnam praesentium",
    "dolore saepe itaque non.",
    "illo doloribus dolorem tempore voluptas illum magnam praesentium",
  ]);
  const [name, setName] = React.useState([
    "Faizan",
    "Suhail Ansari",
    "Harshit",
    "qadir",
    "pasha",
  ]);
  const [star, setStar] = React.useState([3, 3.5, 4, 4.5, 5]);
  const [count, setCount] = React.useState(0);
  const slideImages = () => {};

  return (
    <>
      <div id="" className="slider">
        <div className="container">
          <div style={{margin:"80px 0px",textAlign:"center"}}>
          <h1>What our client says</h1>
          <p>
            Our Client sends us bunch of smiles wit hour services and we love
            them
          </p>
          </div>
          <div className="img_slider">
            <div
              className="circle circle_left"
              onClick={() => {
                if (count == 4) {
                  setCount(0);
                } else {
                  setCount(count + 1);
                }
              }}
            >
              <div className="arrow_left">
                <LeftArrowSvg />
              </div>
            </div>
            <img src={image[`${count}`]} />
            <div
              className="circle circle_right"
              onClick={() => {
                if (count == 0) {
                  setCount(4);
                } else {
                  setCount(count - 1);
                }
              }}
            >
              <div className="arrow_right">
                <RightArrowSvg />
              </div>
            </div>
          </div>
          <p className="paragraph">{description[count]}</p>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Rating name="read-only" style={{borderColor:"white"}} value={star[count]} readOnly />
          </Box>
          <div>{name[count]}</div>
          <div>Moradabad India</div>
        </div>
      </div>
    </>
  );
}

export default Slider;
