import React from 'react'
import './UserDashboard.css'
import Graphs from "../Graphs/Graphs"
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import NotificationsIcon from '@mui/icons-material/Notifications';
function UserDashboard() {
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
                    <h1>Sync Your Social Media Account</h1>
                </div>
             </div>
             <div className="transaction_histiory">
                 <h3>Your Playing History</h3>
             </div>
             </div>
             <div className="user_profile">
                 <div className="user_image"> Image</div>
                 <h3>Faizan Pasha</h3>
                 <button>Affilate User</button>
           <div className="personal_information">
                    <h3>Personal Iformation</h3>
                    <div>Setting ICon</div>
           </div>
           <div className="information_div">
               <div>icon</div>
               <div>This is my address</div>
           </div>

           <div className="information_div">
               <div>icon</div>
               <div>This is my address</div>
           </div>

           <div className="information_div">
               <div>icon</div>
               <div>This is my address</div>
           </div>

             </div> 
            </div>
        </div>
    )
}

export default UserDashboard
