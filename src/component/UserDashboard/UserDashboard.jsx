import React from 'react'
import './UserDashboard.css'
import Graphs from "../Graphs/Graphs"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import TwitterIcon from '@mui/icons-material/Twitter';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Profile_image from "../../assests/images/profile.png"
import AddLocationIcon from '@mui/icons-material/AddLocation';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

// import  {FaPencil}  from "react-icons/fa";

function UserDashboard(props) {
    return (
        <div>
            <div className="user_dashboard_wrapper">
         
             <div className="user_dashboard">
                <div className="user_heading">
                    <h1>Game A Toll</h1>    
                </div>
                 <div style={{display:"flex",justifyContent:"space-between",marginRight :10, borderRadius:100}}>
                 {/*   <p>Affilate</p>
                   <div>month</div>
                </div> */}
                <div className="user_graphs"> 
                    {/* <div className="graphs"> */}
                    <Graphs/>
                        {/* <div> your precesion </div>
                        <div> your risk</div> */}
                    {/* </div> */}
                    <div>Invite your friends</div>
                </div>
                <div className="social_media_affilate">
                    <h4>Sync Your Social Media Account</h4>
                    <div className="social_icon">                    
                    <div className="social_media_icon"> 
                        <InstagramIcon style={{fontSize:"40px",color:"#d34151"}}/>
                        <p>Instagram</p>
                        <button className="connect_btn">connect</button>
                    </div>
                    <div className="social_media_icon"> 
                        <FacebookIcon style={{fontSize:"40px",color:"blue"}}/>
                        <p>Facebook</p>
                        <button className="connect_btn">connect</button>
                    </div>
                    <div className="social_media_icon"> 
                        <LinkedInIcon style={{fontSize:"40px",color:"#007bb5"}}/>
                         <p>LinkdIn</p>
                        <button className="connect_btn">connect</button>
                    </div>
                    <div className="social_media_icon"> 
                        <TwitterIcon style={{fontSize:"40px",color:"#55acee"}}/>
                        <p>Twitter</p>
                        <button className="connect_btn">connect</button>
                    </div>
                    <div className="social_media_icon"> 
                        <NotificationsIcon style={{fontSize:"40px",color:"#fcef3c"}}/>
                        <p>SnapChat</p>
                        <button className="connect_btn">connect</button>
                    </div>
                    </div>

                </div>
             </div>
             <div className="transaction_histiory">
                 <h3>Your Playing History</h3>
             </div>
             </div>
             <div className="user_profile">
                 {/* <div className="user_image">  */}
                    <img className="user_image" src={Profile_image}/>
                 {/* </div> */}
                 <h3 className="user_name"> Faizan Pasha</h3>
                 <button className="user_profile_btn">Affilate User</button>
           <div className="personal_information">
                    <h3>Personal Iformation</h3>
                    <div className="user_setting" onClick={props.openProfile}> <SettingsIcon /></div>
           </div>
           <div className="information_div">
               <div><AddLocationIcon  style={{fontSize:"40px",color:"#f68242"}}/></div>
               <div>This is my address</div>
           </div>

           <div className="information_div">
               <div><PhoneIcon  style={{fontSize:"40px",color:"#936efa"}}/></div>
               <div>This is my address</div>
           </div>

           <div className="information_div">
               <div><EmailIcon  style={{fontSize:"40px",color:"#0f6ffa"}}/></div>
               <div>This is my address</div>
           </div>

             </div> 
            </div>
        </div>
    )
}

export default UserDashboard
