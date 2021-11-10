import React, { useEffect, useState } from "react";
import "./TopGainers.css";

function TopGainers(props) {
  const [firstUser, setFirstUser] = useState({});
  const [secondUser, setSecondUser] = useState({});
  const [thirdUser, setThirdUser] = useState({});

  useEffect(() => {
    setFirstUser(props.topGainers[0]);  
    setSecondUser(props.topGainers[1]);  
    setThirdUser(props.topGainers[2]);  
    console.log(props.topGainers)
  }, [props.topGainers]);

  const backgroundColor = ["#D7D7D7","#FEE101","#A77044"]

  return (
    <div style={{width:"70%",margin:"auto",padding:10}}>
      <h5 style={{marginBottom:30}}>Top Gainers</h5>
      <div className="tiles">
       
           {firstUser && <>
              <div className="tile-container">
                <div className="card" style={{position:"relative"}}>
                  <div style={{height:"30%",backgroundColor:backgroundColor[0],textAlign:"center",paddingTop:12}}><h5>{"$ "+secondUser.amount}</h5></div>
                  <div style={{position:"absolute",top:"16%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%"}}> 
                    <img style={{width:70,border:"3px solid white",borderRadius:"50%"}} src="http://svgur.com/i/65U.svg" />
                    <br></br>
                    <span>{secondUser.name || "Player Name"}</span>
                    <span style={{color:"#a9a4a4"}}>{secondUser.email}</span>
                  </div>
                </div>
              </div>
            </>}

            {secondUser &&<>
              <div className="tile-container">
                <div className="card" style={{position:"relative"}}>
                  <div style={{height:"30%",backgroundColor:backgroundColor[1],textAlign:"center",paddingTop:12}}><h5>{"$ "+firstUser.amount}</h5></div>
                  <div style={{position:"absolute",top:"16%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%"}}> 
                    <img style={{width:70,border:"3px solid white",borderRadius:"50%"}} src="http://svgur.com/i/65U.svg" />
                    <br></br>
                    <span>{firstUser.name || "Player Name"}</span>
                    <span style={{color:"#a9a4a4"}}>{firstUser.email}</span>
                  </div>
                </div>
              </div>
            </>}

            {thirdUser && <>
              <div className="tile-container">
                <div className="card" style={{position:"relative"}}>
                  <div style={{height:"30%",backgroundColor:backgroundColor[2],textAlign:"center",paddingTop:12}}><h5>{"$ "+thirdUser.amount}</h5></div>
                  <div style={{position:"absolute",top:"16%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%"}}> 
                    <img style={{width:70,border:"3px solid white",borderRadius:"50%"}} src="http://svgur.com/i/65U.svg" />
                    <br></br>
                    <span>{thirdUser.name || "Player Name"}</span>
                    <span style={{color:"#a9a4a4"}}>{thirdUser.email}</span>
                  </div>
                </div>
              </div>
            </>}
      
      </div>
    </div>
  );
}

export default TopGainers;
