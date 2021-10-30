// import React from 'react'

// function BasicDetails() {
//     return (
//         <div>
//             <h1>This is basic ifomration of user</h1>
//         </div>
//     )
// }

// export default BasicDetails


import { TextField } from '@material-ui/core';
import React, {useState} from 'react'
import profile from "../../assests/images/gta.jpg";
import "./Profile.css";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import BlockIcon from '@material-ui/icons/Block';

const BasicDetails = ()=> {
    const [memberId, setMemberId] = useState("TRL202112");
    const [userName, setUserName] = useState("Muhammad Faizan");
    const [editUserName, setEditUserName] = useState(false);
    const [fatherName, setFatherName] = useState("Shafquat Hussain");
    const [editFatherName, setEditFatherName] = useState(false);
    const [email, setEmail] = useState("thesuhailansari786246@gmail.com");
    const [editEmail, setEditEmail] = useState(false);
    const [address, setAddress] = useState(
      "mother colony maheshpura paschmi ward no. 21 lakshmi pur pattin road kashipur udham singh nagar uttarakhand"
    );
    const [editAddress, setEditAddress] = useState(false);

    return (
        <>
        <div className="user_info_box">
        {/* <h1>Profile Information</h1> */}

        <img
          src={profile}
          style={{ width: 160, height: 160, borderRadius: "100%" }}
        />
        <div className="profile_line"></div>

        <div className="profile_label_input">
          {/* <label htmlFor="">Member Id</label> */}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
            }}
          >
            <TextField
              variant="outlined"
              disabled={true}
              value={memberId}
            />
              <div
                style={{
                  backgroundColor: "red",
                  color: "white",
                  alignSelf: "stretch",
                  padding: "1px 10px",
                }}
              >
                <BlockIcon style={{ height: "100%" }} />
              </div>
          </div> */}
        </div>
        <div className="profile_label_input">
          <label htmlFor="">Name</label>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
            }}
          >
            <TextField
              variant="outlined"
              disabled={!editUserName}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            {!editUserName && (
              <div
                onClick={() => {
                  setEditUserName(true);
                }}
                style={{
                  backgroundColor: "deepskyblue",
                  color: "white",
                  alignSelf: "stretch",
                  padding: "1px 10px",
                }}
              >
                <EditIcon style={{ height: "100%" }} />
              </div>
            )}
            {editUserName && (
              <div
                onClick={() => {
                  setEditUserName(false);
                }}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  alignSelf: "stretch",
                  padding: "1px 10px",
                }}
              >
                <DoneIcon style={{ height: "100%" }} />
              </div>
            )}
          </div>
        </div>

        <div className="profile_label_input">
          <label htmlFor="">Father Name</label>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
            }}
          >
            <TextField
              variant="outlined"
              disabled={!editFatherName}
              value={fatherName}
              onChange={(e) => {
                setFatherName(e.target.value);
              }}
            />
            {!editFatherName && (
              <div
                onClick={() => {
                  setEditFatherName(true);
                }}
                style={{
                  backgroundColor: "deepskyblue",
                  color: "white",
                  alignSelf: "stretch",
                  padding: "1px 10px",
                }}
              >
                <EditIcon style={{ height: "100%" }} />
              </div>
            )}
            {editFatherName && (
              <div
                onClick={() => {
                  setEditFatherName(false);
                }}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  alignSelf: "stretch",
                  padding: "1px 10px",
                }}
              >
                <DoneIcon style={{ height: "100%" }} />
              </div>
            )}
          </div>
        </div>
        <div className="profile_label_input">
          <label htmlFor="">Email</label>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
            }}
          >
            <TextField
              variant="outlined"
              disabled={!editEmail}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {!editEmail && (
              <div
                onClick={() => {
                  setEditEmail(true);
                }}
                style={{
                  backgroundColor: "deepskyblue",
                  color: "white",
                  alignSelf: "stretch",
                  padding: "1px 10px",
                }}
              >
                <EditIcon style={{ height: "100%" }} />
              </div>
            )}
            {editEmail && (
              <div
                onClick={() => {
                  setEditEmail(false);
                }}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  alignSelf: "stretch",
                  padding: "1px 10px",
                }}
              >
                <DoneIcon style={{ height: "100%" }} />
              </div>
            )}
          </div>
        </div>
        <div className="profile_label_input">
          <label htmlFor="">Address</label>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70%",
            }}
          >
            <TextField
              variant="outlined"
              multiline
              disabled={!editAddress}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            {!editAddress && (
              <div
                onClick={() => {
                  setEditAddress(true);
                }}
                style={{
                  backgroundColor: "deepskyblue",
                  color: "white",
                  alignSelf: "stretch",
                  padding: "1px 10px",
                }}
              >
                <EditIcon style={{ height: "100%" }} />
              </div>
            )}
            {editAddress && (
              <div
                onClick={() => {
                  setEditAddress(false);
                }}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  alignSelf: "stretch",
                  padding: "1px 10px",
                }}
              >
                <DoneIcon style={{ height: "100%" }} />
              </div>
            )}
          </div>
        </div>
      </div>

        </>
    )
}

export default BasicDetails;