import React,{ useEffect, useState, useRef} from "react";
import MatchViewHandle from "./MatchViewHandle";
import { useHistory } from "react-router-dom";
import { fetchData } from "../../middleware/RequestHandler";
import VisitorsView from "../VisitorsView/VisitorsView";
import { io } from "socket.io-client";
import "./MatchView.css"


export default function MatchView() {
  const [isMasterOne, setIsMasterOne] = useState(false);
  const [isMasterTwo, setIsMasterTwo] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const [notSufficientPlayer, setNotSufficientPlayer] = useState(false);
  const [queue, setQueue] = useState([]);

  const router = useHistory();
  const childRef = useRef();

  useEffect(async ()=>{
    // const socket = io('ws://localhost:8080');
    const socket = io('https://gamingatoll.com',{path:'/socket.io'});
    socket.emit('join',{userId: JSON.parse(localStorage.user).id});

    socket.on('connect',async() => {
      const response = await fetchData('/startMatch',{method:"GET"});
    if(response.status && response.message == "match-in-progress") {
      setIsVisitor(true);
      setNotSufficientPlayer(false);
      setIsMasterOne(false);
      setIsMasterTwo(false)
    }
       
    })
    
    socket.on('start-match',(data)=>{
      console.log("start match");
      console.log(data);
      setNotSufficientPlayer(false);
      setIsVisitor(false);
      if(data.type == "master-one") {
        setIsMasterOne(true);
      } else if(data.type == "master-two") {
        setIsMasterTwo(true);
      }
    })
    socket.on('insufficient-players',()=>{
      console.log("Insufficient-players")
      setNotSufficientPlayer(true);
      setIsMasterOne(false)
      setIsMasterTwo(false)
    })

    socket.on('end-match',()=>{
      // childRef.current.endMatch();
      router.push('/')
      window.location.reload();
    })
    socket.on('update-queue',(newQueue)=>{
      const updateQueue = (JSON.parse(newQueue.queue))
      setQueue(prevQeueue => setQueue(updateQueue));
    })
    
    
  },[])

  if(notSufficientPlayer) {
    return (
      <div className="alert_center">
        There is no active match on the server. Please wait for more players to
        join
      </div>
    )
  }

  return (
    <>
      ￼
      {isMasterOne && (
        <div className="match_view">
          <div className="camera_view">
            <MatchViewHandle
              masterChannel="game-a-toll-camera-one"
              viewerChannel="game-a-toll-camera-two"
              type="camera"
              ref = {childRef}
            />
          </div>
          <div className="screen_view">
            <MatchViewHandle
              masterChannel="game-a-toll-screen-one"
              viewerChannel="game-a-toll-screen-two"
              type="screen"
              ref = {childRef}
            />
          </div>
        </div>
      )}
      {isMasterTwo && (
        <div className="match_view">
          <div className="camera_view">
            <MatchViewHandle
              masterChannel="game-a-toll-camera-two"
              viewerChannel="game-a-toll-camera-one"
              type="camera"
              ref = {childRef}
            />
          </div>
          <div className="screen_view">
            <MatchViewHandle
              masterChannel="game-a-toll-screen-two"
              viewerChannel="game-a-toll-screen-one"
              type="screen"
              ref = {childRef}
            />``
          </div>
        </div>
      )}
     {isVisitor && (
        <div>
          <div style={{position:"relative"}}>
          <VisitorsView callback={()=>{}}/>
          <div style={{position:"absolute",bottom:"0px",right:"0px"}}>
            {console.log(queue)}
            {queue.map((v,i)=>{
              return (
                <>
                <span>{v.email}</span> <br></br>
                </>
              )
            })}
          </div>
          </div>
         
        </div>
      )}
    </>
  );
}
