// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,BarChart,Bar } from 'recharts';

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Line } from "react-chartjs-2";
import { fetchData } from "../../middleware/RequestHandler";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./Graph.css";

// import React from 'react'

function Graphs() {
  const [filter, setFilter] = React.useState("week");
  const [dataLost, setDataLost] = React.useState([]);
  const [dataWon, setDataWon] = React.useState([]);
  const [labels, setLables] = React.useState([]);
  
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
 
  React.useEffect(async () => {
    let payload = {
      userId: JSON.parse(localStorage.user).id,
      filter,
    };
    let graphData = await fetchData("/getUserStats", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (graphData && graphData.status) {
      setDataLost(graphData.message.dataLost);
      setDataWon(graphData.message.dataWon);
      setLables(graphData.message.labels);
    }

    console.log(graphData);
  }, [filter]);

  const dataForWon = (canvas) => {
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0,0,0,400)
    // gradient.addColorStop(0, 'rgba(58,123,213,1)');
    gradient.addColorStop(0, '#05ff00');
    // gradient.addColorStop(0, 'black');
    // gradient.addColorStop(0, 'black');
    // gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'rgba(0,210,255,0.3)');
      return {
        
          labels,
          datasets: [
            {
              label: "Number Of wins",
              data: dataWon,

              fill: true,
              backgroundColor: gradient,
              borderColor: [
               "#05ff00"
              ],
              borderWidth: 1,
            },
          ],
          
         
      }
    }

    const dataForLoss = (canvas) => {
      const ctx = canvas.getContext("2d")
      const gradient = ctx.createLinearGradient(0,0,0,400)
      // gradient.addColorStop(0, 'rgba(58,123,213,1)');
      gradient.addColorStop(0, '#ff0000');
      // gradient.addColorStop(0, 'black');
      // gradient.addColorStop(0, 'black');
      // gradient.addColorStop(0, 'black');
      gradient.addColorStop(1, '#fff');
        return {
          
            labels,
            datasets: [
              {
                label: "Number Of wins",
                data: dataLost,
  
                fill: true,
                backgroundColor: gradient,
                borderColor: [
                 "#ff0000"
                ],
                borderWidth: 1,
              },
            ],
            
           
        }
      }

  return (
    <>
      <div style={{display:"flex",justifyContent:"flex-end"}}>
      <Box sx={{ minWidth: 200,marginBottom:3}}>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Month</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Month"
          onChange={handleChange}
        >
          <MenuItem value="month">Monthly</MenuItem>
          <MenuItem value="week">Weekly</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row !important",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: 450,border:"2px solid whitesmoke",padding:"0px 5px" }}>
          <Line
            options={{
              responsive: true,
              radius: 3,
              hoverRadius: 7,
              tension: 0.5,
              scales: {
                x: {
                    grid:{
                     display:false
                         }
                   },
                y: 
                   {
                 grid:{
                  display:false
                      }
                   }
                       }
            }}
            data={dataForWon}
          />
        </div>
        <div style={{ width: 450,border:"2px solid whitesmoke",padding:"0px 5px" }}>
          <Line
            options={{
              responsive: true,
              radius: 3,
              hoverRadius: 7,
              tension: 0.5,
              scales: {
                x: {
                    grid:{
                     display:false
                         }
                   },
                y: 
                   {
                 grid:{
                  display:false
                      }
                   }
                       }
            }}
            data={dataForLoss}
          />
        </div>
      </div>
    </>
  );
}

export default Graphs;
