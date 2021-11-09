// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,BarChart,Bar } from 'recharts';

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Line } from "react-chartjs-2";

// import React from 'react'

function Graphs() {
  // function createData(name, calories, fat, carbs, protein) {
  //     return { name, calories, fat, carbs, protein };
  //   }

  //   const rows = [
  //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //     createData('Eclair', 262, 16.0, 24, 6.0),
  //     createData('Cupcake', 305, 3.7, 67, 4.3),
  //     createData('Gingerbread', 356, 16.0, 49, 3.9),
  //   ];

  // const data = [{name: '01', uv: 400, pv: 400, amt: 2400},{name: '02', uv: 300, pv: 500, amt: 2400}, {name: '03', uv: 200, pv: 300, amt: 2400},{name: '04', uv: 450, pv: 250, amt: 2400}];

  // const [data, setData]=React.useState({})
  // setData({data:{
  //   labels:["1","2","3","4","5"],
  //   datasets:[
  //     {
  //       label:"Match Graph",
  //       backkgroundColor:"rgba(255,0,255,0.75)",
  //       data:[4,5,10,1,32,2,12]
  //     }
  //   ]
  // }})

  return (
    <div>
      <Line
        options={{
          responsive: true,
          radius: 5,
        }}
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              fill: true,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
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
      {/* <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{border:"4px solid whiteSmoke", padding:10, borderRadius:10}}>

    <LineChart width={280} height={200} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
        </div>

        <div style={{border:"4px solid whiteSmoke", padding:10, borderRadius:10}}>
        <BarChart width={280} height={200} data={data}>
    <XAxis dataKey="name" stroke="#8884d8" />
    <YAxis />
    <Tooltip />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <Bar dataKey="uv" fill="#8884d8" barSize={30} />
  </BarChart>




        </div>

        </div>
        <div> */}
      {/* <TableContainer component={Paper} sx={{p:10}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
      {/* </div> */}
    </div>
  );
}

export default Graphs;
