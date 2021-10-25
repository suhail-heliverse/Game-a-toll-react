import React, { useState } from "react";
import { Footer, Faq, Banner, Slider, Header , HowPlay} from "../index";
import "./HomeScreen.css"

function HomeScreen() {
  const [showPopup, setShowPopup] = useState(false);
  function gamePopup() {
    setShowPopup(!showPopup);
  }

  return (
    <>
      <div className="home_screen_container">
        <Header gamePopup={gamePopup} />
        {/* {showPopup && <GamePopup />} */}
        <Banner />
        <HowPlay />
        <Slider />
        <Faq />
        <Footer />
      </div>
    </>
  );
}

export default HomeScreen;
