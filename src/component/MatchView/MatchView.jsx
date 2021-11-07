import React,{ useEffect, useState, useRef} from "react";
import MatchViewHandle from "./MatchViewHandle";
import { useHistory } from "react-router-dom";
import { fetchData } from "../../middleware/RequestHandler";
import VisitorsView from "../VisitorsView/VisitorsView";
import { io } from "socket.io-client";
import "./MatchView.css"
import { startMaster } from "../../utils/service";


export default function MatchView() {
  const [isMasterOne, setIsMasterOne] = useState(false);
  const [isMasterTwo, setIsMasterTwo] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const [notSufficientPlayer, setNotSufficientPlayer] = useState(false);
  const [localStreamScreen,setLocalStreamScreen] = useState(null);
  const [localStreamCamera,setLocalStreamCamera] = useState(null);
  const [mediaStreamReady,setMediaStreamReady] = useState(false);
  const [startNewChannel,setStartNewChannel] = useState(0);
  const [queue, setQueue] = useState([]);

  
  const router = useHistory();
  useEffect(async ()=>{
    // const socket = io('https://gamingatoll.com',{path:'/socket.io'});
    const socket = io('http://localhost:8080',{path:'/socket.io'});
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
        console.log("Master one")
        setIsMasterOne(true);
        setIsMasterTwo(false);
      } else if(data.type == "master-two") {
        console.log("Master-Two")
        setIsMasterTwo(true);
        setIsMasterOne(false);
      }
    })
    socket.on('insufficient-players',()=>{
      console.log("Insufficient-players")
      setNotSufficientPlayer(true);
      setIsMasterOne(false)
      setIsMasterTwo(false)
    })

    socket.on('end-match',()=>{
      router.push('/')
      window.location.reload();
    })
    socket.on('update-queue',(newQueue)=>{
      const updateQueue = (JSON.parse(newQueue.queue))
      setQueue(prevQeueue => setQueue(updateQueue));
    })
    socket.on('join-new-channel',(data)=>{
      console.log("JOIN NEW CHANNEL",data)
      console.log(localStreamCamera,localStreamScreen,mediaStreamReady);
      setStartNewChannel(data.batch);
      // startMaster(localStreamCamera,"game-a-toll-camera-two-batch-"+data.batch)
    })

    try {
      setLocalStreamCamera(await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      }));
     setLocalStreamScreen(await navigator.mediaDevices.getDisplayMedia());
     
  } catch (e) {
    console.log(e)
    console.error("[MASTER] Could not find webcam");
  }
  },[])

  useEffect(()=>{
    if(localStreamScreen && localStreamCamera) {
      setMediaStreamReady(true);
      console.log(localStreamScreen,localStreamCamera,mediaStreamReady);
    }else {
      console.log(localStreamScreen,localStreamCamera,mediaStreamReady);
    }
  },[localStreamCamera,localStreamScreen])

  useEffect(()=>{
    if(startNewChannel >= 2) {
      console.log(localStreamScreen,localStreamCamera,mediaStreamReady,isMasterOne,isMasterTwo)
      if(isMasterOne) {
        console.log("game-a-toll-camera-one-batch")
        startMaster(localStreamCamera,"game-a-toll-camera-one-batch-"+startNewChannel)
        startMaster(localStreamScreen,"game-a-toll-screen-one-batch-"+startNewChannel)
      } else if(isMasterTwo) {
        console.log("game-a-toll-camera-two-batch")
        startMaster(localStreamCamera,"game-a-toll-camera-two-batch-"+startNewChannel)
        startMaster(localStreamScreen,"game-a-toll-screen-two-batch-"+startNewChannel)
      }
    }
  },[startNewChannel])

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
      {isMasterOne && mediaStreamReady &&(
        <div className="match_view">
          <div className="camera_view">
            <MatchViewHandle
              masterChannel="game-a-toll-camera-one-batch-1"
              viewerChannel="game-a-toll-camera-two-batch-1"
              localStream = {localStreamCamera}
            />
          </div>
          <div className="screen_view">
            <MatchViewHandle
              masterChannel="game-a-toll-screen-one-batch-1"
              viewerChannel="game-a-toll-screen-two-batch-1"
              localStream = {localStreamScreen}
            />
          </div>
        </div>
      )}
      {isMasterTwo && mediaStreamReady &&(
        <div className="match_view">
          <div className="camera_view">
            <MatchViewHandle
              masterChannel="game-a-toll-camera-two-batch-1"
              viewerChannel="game-a-toll-camera-one-batch-1"
              localStream = {localStreamCamera}
            />
          </div>
          <div className="screen_view">
            <MatchViewHandle
              masterChannel="game-a-toll-screen-two-batch-1"
              viewerChannel="game-a-toll-screen-one-batch-1"
              localStream = {localStreamScreen}
            />
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
