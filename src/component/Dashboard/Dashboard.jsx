import React from "react";
import { useHistory } from "react-router";
import {UserHeader} from "../index"
function Dashboard(){
  const [verifyUser,setVerifyUser] = React.useState(false);
  const router = useHistory();
  React.useEffect(async()=>{
      const response = await (await fetch('https://gamingatoll.com/verifyUser',{method:"GET",headers:{'Authorization':localStorage.accessToken}})).json();
  if(response.message == "Unauthorized") {
    router.push('/')
  } else {
    setVerifyUser(true)
  }
  },[])

  return (
    <>
    
      {verifyUser && <UserHeader/>}
      </>
    
  )
}


export default Dashboard