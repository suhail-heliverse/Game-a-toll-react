import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Header } from '..';
import { fetchData } from '../../middleware/RequestHandler';
import LeaderTable from '../LeaderTable/LeaderTable';
import TopGainers from '../TopGainers/TopGainers';

function Leaderboard() {

    const [games,setGames] = useState([]);
    const [currentGame,setCurrentGame] = useState({});
    const [leaderboard,setLeaderboard] = useState([]);
    const [topGainers,setTopGainers] = useState([]);
    const router = useHistory()
    useEffect(async()=>{
        const response = await (await fetch('http://localhost:8080/verifyUser',{method:"GET",headers:{'Authorization':localStorage.accessToken}})).json();
    if(response.message == "Unauthorized") {
      router.push('/')
    }
    },[])

    useEffect(async()=>{
        const response = await fetchData("/games", { method: "GET" });
        if (response && response.status) {
            setGames(response.games)
        }
    },[])

    useEffect(()=>{
        if(games.length > 0) {
            setCurrentGame(games[0]);
        }
    },[games])

    useEffect(async()=>{
        const payload = JSON.stringify({gameId: currentGame._id});
        const response = await fetchData("/leaderboard",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:payload})
        if(response.status) {
            setLeaderboard(response.message.leaderboard)
            setTopGainers(response.message.topGainers)
        }
    },[currentGame])

    return (
        <div style={{marginTop:100}}>
        <Header />
        <TopGainers topGainers={topGainers}/>
        <LeaderTable leaderData = {leaderboard}/>
        </div>
    )
}

export default Leaderboard;