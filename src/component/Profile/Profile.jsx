import React from 'react';
import './Profile.css'
import bannerImage from "../../assests/images/profile.png";

function Profile() {
  return (
    <div className="account_setting">
      <h3>Account setting</h3>
      <div className="profile_info">
      <div className="profile_image">
       <img src={bannerImage}/>
        <button className="im_change_btn">Change</button>
      </div>
      <div className="pi">
       <h3 className="pi_heading">Personal Information</h3> 
        <div>
          <div className="pi_field">
          <label>Name</label>
          <input/>
          </div>

          <div className="pi_field">
          <label>Email</label>
          <input/>
          </div>

          <div className="pi_field">
          <label>Phone</label>
          <input/>
          </div>

          <div className="pi_field">
          <label>Address</label>
          <textarea rows="4" cols="70" style={{borderRadius:10}}/>
          </div>
          <h3 className="pi_heading">Personal Information</h3> 
        </div>
        <div className="pi_field">
          <label>Current Password</label>
          <input/>
          </div>
          <div className="pi_field">
          <label>New Password</label>
          <input/>
          </div>
          <div>
            <button className="im_save_btn">Save</button>
          </div>
      </div>
    </div>
    </div>
  )
}

export default Profile
