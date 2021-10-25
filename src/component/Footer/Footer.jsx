import React from "react";
import "./Footer.css"
import facebookImg from "../../assests/images/facebook.png"
import twitterImg from "../../assests/images/tewiter.png"
import instaImg from "../../assests/images/insta.png"

function Footer() {
  return (
    <>
      <div id="" className="footer_container">
        <div className="first_container">
          <h2>Game A Toll</h2>
          <div className="support">
            <div>PlayGame</div>
            <div>My Account</div>
            <div>My Pass</div>
            <div>Community</div>
            <div>Support</div>
          </div>
          <div className="social_connection">
            <img src={facebookImg} />
            <img src={twitterImg} />
            <img src={instaImg} />
          </div>
        </div>
        <div className="second_container">
          <p>Created by game at a toll. © 2020</p>
          <div className="email_Subscribe">
            <input placeholder="Enter  Email"></input>
            <button className="started_btn">Subcribe</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
