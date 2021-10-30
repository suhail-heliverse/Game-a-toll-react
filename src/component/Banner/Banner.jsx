import React from "react";
import "./Banner.css"
import bannerImage from "../../assests/images/game_a_toll.png";

function Banner() {
  return (
    <>
      <div id="" className="banner">
        <div className="banner_text">
          <h1>
            Play Game <br /> Everyday.
            <br />
            Always be   <br />
            Winner.
          </h1>
          {/* <p>
            Dynamically customize effective meta-services through market-driven
            deliverables.
            <br /> Interaictively generate flexible
          </p> */}
          <button className="started_btn" id="banner_button">Get Started</button>
        </div>
        <div className="banner_image">
          <img src={bannerImage} />
        </div>
      </div>
    </>
  );
}

export default Banner;
