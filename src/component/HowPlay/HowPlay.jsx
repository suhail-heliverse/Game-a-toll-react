import React from "react";
import "./HowPlay.css";
import { ReactComponent as TropySvg } from "../../assests/svg/Vector.svg";

function HowPlay() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px 10px",
        // overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#222",
      }}
    >
      <div className="play_container">
        <div style={{marginTop:80}}>
          <h1>How to play</h1>
          <h2>Frequently asked question about hookah and association</h2>
        </div>
        <div className="play_video">
          <div className="play_video_card">
            <TropySvg />
            <h3>1. How to First Run</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              aperiam nulla fugit sapiente atque facilis quidem libero, modi non
              consectetur provident veniam
            </p>
          </div>

          <div className="play_video_card">
            <TropySvg />
            <h3>2. How to Paly</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              aperiam nulla fugit sapiente atque facilis quidem libero, modi non
              consectetur provident veniam
            </p>
          </div>
          <div className="play_video_card">
            <TropySvg />
            <h3>3. How to Win</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              aperiam nulla fugit sapiente atque facilis quidem libero, modi non
              consectetur provident veniam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowPlay;
