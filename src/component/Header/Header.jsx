import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchData } from "../../middleware/RequestHandler";
import { ReactComponent as SimpleMenuSvg } from "../../assests/svg/Group.svg";
import { ReactComponent as CrossMenuSvg } from "../../assests/svg/cross.svg";
import { Login, Signup } from "..";
import "./Header.css";
import PaymentGateway from "../PaymentGateway/PaymentGateway";
import CustomizedSnackbars from "../Snackbar/Snackbar";

function Header() {
  const [showGamePopup, setShowGamePopup] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const [sideBar, setSidebar] = useState(false);
  const [openIcon, setOpenIcon] = useState(false);
  const [showPayment,setShowPayment] = useState(false);
  const [showSnackBar,setShowSnackBar] = useState(false);
  const [snackBarMsg,setSnackBarMsg] = useState(false);
  const [game,setGame] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);
  const router = useHistory();
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const API_ENDPOINT = "https://gamingatoll.com";
  // "http://localhost:8080";

  // const sideBarRef = useRef();

  async function getStarted() {
    // const response = await fetchData("/games", { method: "GET" });
    // if (response && response.status) {
      // setGame(response.games[0]);
      setLoginPopup(true)
      // setShowPayment(true);
      // return; 
    // }
    // setShowPayment(false)
    // setLoginPopup(true);
  }

  useEffect(async() => {
    const response = await (await fetch('http://localhost:8080/verifyUser',{method:"GET",headers:{'Authorization':localStorage.accessToken}})).json();
    if(response.message == "Unauthorized") {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  },[]);

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
      <div id="" className="header">
        <div
          className="header-sub"
          ref={headerRef}
          style={{
            display: "flex",
            height: 70,
            justifyContent: "space-around",
            backgroundColor: "#222",
            color: "white",
            alignItems: "center",
            fontSize: "bold",
            letterSpacing: 2,
            fontSize: "larger",
            position: "fixed",
            width: "100%",
            top: 0,
            zIndex: 4,
          }}
        >
          <div
            className="hide-logo"
            style={{ margin: "0px 0px" }}
            onClick={() => {
              setMenuState((menuState) => !menuState);
              console.log(menuState);
              if (!menuState) {
                menuRef.current.style.left = "0px";
                setOpenIcon(true);
              } else {
                menuRef.current.style.left = "-100%";
                setOpenIcon(false);
              }
            }}
          >
            {!openIcon && <SimpleMenuSvg />}
            {openIcon && <CrossMenuSvg />}
          </div>

          <div className="company-logo">Game A Toll</div>
          <div className="middle">
            <div>How To Play</div>
            <div>Testimonial</div>
            <div>FAQ'S</div>
            <div>Blog</div>
            <div onClick={()=>{router.push('/leaderboard')}}>Leaderboard</div>
          </div>

            {loggedIn == true ? <button className="started_btn" >{JSON.parse(localStorage.user).username}</button>:<button className="started_btn" onClick={getStarted}>Login</button>}
        </div>

        <div className="sub-header" ref={menuRef}>
          <div className="sub_header_item">
            <div className="options">How To Play</div>
            <div className="options"> Testimonial</div>
            <div className="options">FAQ'S</div>
            <div className="options">Blog</div>
            <div onClick={()=>{router.push('/leaderboard')}}>Leaderboard</div>
          </div>
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
          loggedIn = {()=>setLoggedIn(true)}
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

export default Header;
