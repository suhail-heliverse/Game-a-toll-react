import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@material-ui/core/TextField";
import CustomizedSnackbars from "../Snackbar/Snackbar";
import facebookImg from "../../assests/images/facebook.png"
import googleImg from "../../assests/images/google.png"
import "./Login.css"
import PaymentGateway from "../PaymentGateway/PaymentGateway";
import { fetchData } from "../../middleware/RequestHandler";
import { Route, Switch } from "react-router-dom";
import { AdminView } from "..";

const API_ENDPOINT = 
// "https://gamingatoll.com";
"http://localhost:8080";

function Login({showSignup, closeHandler,loggedIn}) {

  const router = useHistory();
  const [email, setEmail] = useState("thesuhailansari786246@gmail.com");
  const [password, setPassword] = useState("suhail@123321");
  const [forgetPass, setForgetPass] = useState(true);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [showPayment,setShowPayment] = useState(false);
  const [game,setGame] = useState(false);
  const [currentState,setCurrentState] = useState(true);
  const [snackBarInfo, setSnackBarInfo] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);

  const checkValidation = () => {
    console.log("faizan pasha");
    if (email === "") {
      console.log("your email has been empty");

      setErrorEmail(true);
      return false;
    }
    setErrorEmail(false);
    if (password === "") {
      setErrorPassword(true);
      return false;
    }
    setErrorPassword(false);
    return true;
  };
  let payload = {
    email,
    password,
  };

  const showSnackBar = (messageData) => {
    setSnackBarInfo(messageData);
    setOpenSnackBar(false);
    setOpenSnackBar(true);
  };

  async function sendData() {
    if (!forgetPass) {
      const response = await axios.post(`${API_ENDPOINT}/forgot`, payload);
      return;
    }
    const response = await axios.post(`${API_ENDPOINT}/login`, payload);
    let messageData = response.data.message;

    if (response.data.status) {
      loggedIn()
      showSnackBar(messageData);
      clearFields();
      localStorage.accessToken = response.data.accessToken;
      localStorage.refreshToken = response.data.refreshToken;
      localStorage.user = JSON.stringify(response.data.user);
      if(response.data.admin) {
        setIsAdmin(true);
        router.push('/admin')
        return;
      }
      const games = await fetchData('/games',{method:"GET"})
      setGame(games.games[0])
      setCurrentState(false)
      setShowPayment(true);
      return;
    }
    showSnackBar(messageData);
    clearFields();
  }

  function clearFields() {
    setPassword("");
    setEmail("");
  }

  const joinHandler = async(game, paymentStatus) => {
    if(paymentStatus) {
      const payload = {gameId:game._id,userId:JSON.parse(localStorage.user).id,active:true,email:JSON.parse(localStorage.user).email};
        console.log(payload)
        let response = await fetchData('/payment',{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});
        setSnackBarInfo("Payment successful");
        setTimeout(()=>{
          return router.push("/match")
        },2000);
    }      
    else {
      setSnackBarInfo("Payment failed")
    }
    setOpenSnackBar(false);
    setOpenSnackBar(true);
  };

  return (
    <>
      <Dialog open={currentState}>
        <div className="login_container">
          <div className="login_header">
            <div
              onClick={closeHandler}
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              X
            </div>
            <h3 className="login_signup">Login Or Sign up</h3>
            <div></div>
          </div>
          <div className="login_box">
            <div className="login_pane">
              <div className="login_pane_heading">
                <h3 className="heading">Welcome To Game A Toll</h3>
              </div>
            </div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              className="text_field_box"
            >
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="text_field"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {forgetPass && (
                <>
                  <TextField
                    id="outlined-basic"
                    type="password"
                    label="Password"
                    variant="outlined"
                    className="text_field"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </>
              )}
            </Box>
            <div className="login_btn">
              <button className="continue_btn" onClick={sendData}>
                Continue
              </button>
            </div>
            <div className="forget_password">
              <a
                href="#"
                onClick={() => {
                  setForgetPass(false);
                }}
              >
                Forget Password
              </a>
            </div>
            <div className="or_line">
              <div className="line"></div>
              <div>OR</div>
              <div className="line"></div>
            </div>

            <div className="social_btn">
              <button>
                <div className="inside_social_btn">
                  <div className="inside_svg">
                    <img src={facebookImg} />
                  </div>
                  <div className="ctn_with_btn">
                    <a href={`${API_ENDPOINT}/auth/facebook`}>
                      Continue With Facebook
                    </a>
                  </div>
                </div>
              </button>
            </div>
            <div className="social_btn">
              <button>
                <div className="inside_social_btn">
                  <div className="inside_svg">
                    <img src={googleImg} />
                  </div>
                  <div className="ctn_with_btn">
                    <a
                      className="gogle_btn"
                      href={`${API_ENDPOINT}/auth/google`}
                    >
                      Continue With Google
                    </a>
                  </div>
                </div>
              </button>
            </div>
            <div className="social_btn">
              <button onClick={showSignup}>
                <div className="inside_social_btn">
                  <div className="inside_svg"></div>
                  <div className="ctn_with_btn">
                    New User? Please Create Account
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      {openSnackBar && (
        <CustomizedSnackbars open={openSnackBar} message={snackBarInfo} />
      )}
      {showPayment && <PaymentGateway action={true} success={(paymentStatus)=>joinHandler(game,paymentStatus)}/>}
    </>
  );
}

export default Login;
