import React, { useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import TextField from "@material-ui/core/TextField";
import "./Signup.css"
import axios from "axios";


const API_ENDPOINT="https://gamingatoll.com"
function Signup({ showLogin, closeHandler }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [confirmPassword, setConfirmPassword] = useState();

  let payload = {
    email,
    password,

    confirmPassword,
  };

  async function sendData() {
    const response = await axios.post(`${API_ENDPOINT}/signup`, payload);
    console.log(response);
    if (response.data.status == true) {
      showLogin();
    }
  }
  function clearFields() {
    setEmail("");

    setPassword("");
    setConfirmPassword("");
  }
  return (
    <>
      <Dialog open={true}>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <TextField
                id="outlined-basic"
                type="password"
                label="Password"
                variant="outlined"
                className="text_field"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <TextField
                id="outlined-basic"
                type="Password"
                label="Confirm Password"
                variant="outlined"
                className="text_field"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Box>
            <div className="login_btn">
              <button className="continue_btn" onClick={sendData}>
                Continue
              </button>
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
                    <img src="/assets/images/google.png" />
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
              <button>
                <div className="inside_social_btn">
                  <div className="inside_svg">
                    <img src="/assets/images/facebook.png" />
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
              <button onClick={showLogin}>
                <div className="inside_social_btn">
                  <div className="inside_svg"></div>
                  <div className="ctn_with_btn">
                    Already have an account? Please Login here
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Signup;
