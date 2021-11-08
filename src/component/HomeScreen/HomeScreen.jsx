import React, { useEffect, useState } from "react";
import { fetchData } from "../../middleware/RequestHandler";
import { Footer, Faq, Banner, Slider, Header , HowPlay} from "../index";
import VisitorsView from "../VisitorsView/VisitorsView";
import "./HomeScreen.css"

function HomeScreen() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentMatchStatus, setCurrentMatchStatus] = useState(false);
  useEffect(async () => {
    const response = await fetchData("/getActiveMatch", { method: "GET" });
    if (response.status) {
      setCurrentMatchStatus(true);
    }
  }, []);

  function gamePopup() {
    setShowPopup(!showPopup);
  }

  return (
    <>
      <div className="home_screen_container">
        <Header gamePopup={gamePopup} />
        {/* {showPopup && <GamePopup />} */}
        <Banner />
        {currentMatchStatus && <VisitorsView callback={()=>{}}/>}
        <HowPlay />
        <Slider />
        <Faq />
        <Footer />
      </div>
    </>
  );
}

export default HomeScreen;
