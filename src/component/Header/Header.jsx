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
  const router = useHistory();
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const API_ENDPOINT = 
  // "https://gamingatoll.com";
  "http://localhost:8080";

  // const sideBarRef = useRef();

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

  useEffect(() => {
    function changeBC() {
      if(window.pageYOffset >= window.innerHeight-70) {
        if(headerRef.current)headerRef.current.style.backgroundColor = "#000"
        if(menuRef.current)menuRef.current.style.backgroundColor = "#000"
        // headerRef.current.style.color = "#000"
      }
      else {
        if(headerRef.current)headerRef.current.style.backgroundColor = "#222"
        if(menuRef.current) menuRef.current.style.backgroundColor = "#222"
        // headerRef.current.style.color = "#fff"
      }
    }
    window.addEventListener("scroll",changeBC);
    return window.removeEventListener("scroll",changeBC)
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
          </div>

          <button className="started_btn" onClick={getStarted}>
            Get Started
          </button>
        </div>

        <div className="sub-header" ref={menuRef}>
          <div className="sub_header_item">
            <div className="options">How To Play</div>
            <div className="options"> Testimonial</div>
            <div className="options">FAQ'S</div>
            <div className="options">Blog</div>
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
