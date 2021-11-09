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
  const [filter, setFilter] = React.useState("month");
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

  return (
    <>
      <div style={{display:"flex",justifyContent:"flex-end"}}>
      <Box sx={{ minWidth: 200 }}>
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
          justifyContent: "space-around",
        }}
      >
        <div style={{ width: 500, height: 400 }}>
          <Line
            options={{
              responsive: true,
              radius: 5,
            }}
            data={{
              labels,
              datasets: [
                {
                  label: "Number Of wins",
                  data: dataWon,

                  fill: true,
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
        <div style={{ width: 500, height: 400 }}>
          <Line
            options={{
              responsive: true,
              radius: 5,
            }}
            data={{
              labels,
              datasets: [
                {
                  label: "Number Of Loss",
                  data: dataLost,
                  fill: true,
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Graphs;
