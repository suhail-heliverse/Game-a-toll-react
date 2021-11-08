import React, { useState } from "react";
import "./Banner.css"
import bannerImage from "../../assests/images/game_a_toll.png";
import { Login, Signup } from "..";
import PaymentGateway from "../PaymentGateway/PaymentGateway";
import CustomizedSnackbars from "../Snackbar/Snackbar";
import { fetchData } from "../../middleware/RequestHandler";
import { useHistory } from "react-router";

function Banner() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPayment,setShowPayment] = useState(false);
  const [showSnackBar,setShowSnackBar] = useState(false);
  const [snackBarMsg,setSnackBarMsg] = useState(false);
  const [game,setGame] = useState(false);
  const router = useHistory();

  async function getStarted() {
    const response = await fetchData("/games", { method: "GET" });
    if (response && response.status) {
      if(JSON.parse(localStorage.user).email == "admin@gmail.com") {
        router.push('/admin')
        return;
      }
      setGame(response.games[0]);
      setLoginPopup(false)
      setShowPayment(true);
      return; 
    }
    setShowPayment(false)
    setLoginPopup(true);
  }


  const joinHandler = async(game, paymentStatus) => {
    if(paymentStatus) {
      const payload = {gameId:game._id,userId:JSON.parse(localStorage.user).id,active:true,email:JSON.parse(localStorage.user).email};
        console.log(payload)
        let response = await fetchData('/payment',{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});
        setSnackBarMsg("Payment successful");
        setTimeout(()=>{
          return router.push("/match")
        },2000);
    }      
    else {
    setSnackBarMsg("Payment failed")
    }
      setShowSnackBar(false);
      setShowSnackBar(true);
  };

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
          <button className="started_btn" id="banner_button" onClick={getStarted}>Get Started</button>
        </div>
        <div className="banner_image">
          <img src={bannerImage} />
        </div>
      </div>
      {loginPopup && (
        <Login
          showSignup={() => {
            setLoginPopup(false);
            setShowRegister(true);
          }}
          closeHandler={() => {
            setLoginPopup(false);
            setShowRegister(false);
          }}
        />
      )}
      {showRegister && (
        <Signup
          showLogin={() => {
            setLoginPopup(true);
            setShowRegister(false);
          }}
          closeHandler={() => {
            setLoginPopup(false);
            setShowRegister(false);
          }}
        />
      )}
      {showPayment && <PaymentGateway action={true} success={(paymentStatus)=>joinHandler(game,paymentStatus)}/>}
      {showSnackBar && (
        <CustomizedSnackbars open={showSnackBar} message={snackBarMsg} />
      )}
    </>
  );
}

export default Banner;
