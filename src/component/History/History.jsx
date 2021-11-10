// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";

// const columns = [
//   { id: "gameImage", label: "Game Image", minWidth: 170 },
//   { id: "gameName", label: "Game Name", minWidth: 100 },
//   {
//     id: "date",
//     label: "Date",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "entryFee",
//     label: "Entry Fee",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },

//   {
//     id: "winningAmount",
//     label: "WinningAmount",
//     minWidth: 170,
//     align: "right",
   
//   },
// ];




// const useStyles = makeStyles({
//   root: {
//     width: "100%",
//   },
//   container: {
//     maxHeight: 440,
//   },
// });

// const userHistoryDataf = [
//   {
//     gameImage: "https:",
//     gameName: "Pubg",
//     date: "2021-11-08T08:33:54.613Z",
//     entryFee: 10,
//     status: false,
//     winningAmount: 0,
//   },
//   {
//     gameImage: "https:",
//     gameName: "Pubg",
//     date: "2021-11-08T08:33:54.613Z",
//     entryFee: 10,
//     status: false,
//     winningAmount: 0,
//   },

//   {
//     gameImage: "https:",
//     gameName: "Pubg",
//     date: "2021-11-08T08:33:54.613Z",
//     entryFee: 10,
//     status: false,
//     winningAmount: 0,
//   },
// ];

// export default function History(props) {
//   const [rows, setRows] = React.useState(props.userHistoryData);
//   const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [rowsAvailable, setRowsAvailable] = React.useState(false);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   React.useEffect(() => {
//     setRows(props.userHistoryData);

//   }, [props.userHistoryData]);
//   React.useEffect(() => {
//     if (rows.length > 0) {
//       setRowsAvailable(true);
//     }
//   }, [rows]);
//   console.log(rows);
//   if (!rowsAvailable) {
//     return <div>table is empty.</div>;
//   }

//   return (
//     <Paper className={classes.root}>
//       <TableContainer className={classes.container}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];

//                       if (column.id == "gameImage") {
                       
//                         return (
//                           <TableCell key={column.id} align={column.align}>
//                             <img style={{ height: 50 }} src={value}></img>
//                           </TableCell>
//                         );
//                       }
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === "number"
//                             ? column.format(value)
//                             : value}

//                           {console.log(row[0])}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CircularProgress from '@mui/material/CircularProgress';

export default function BasicTable(props) {
  const [rows, setRows] = React.useState(props.userHistoryData);
  const [rowsAvailable, setRowsAvailable] = React.useState(false);
  const [loader, setLoader]=React.useState(true);
    React.useEffect(() => {
    setRows(props.userHistoryData);
  }, [props.userHistoryData]);

  React.useEffect(() => {
    if (rows.length > 0) {
      setRowsAvailable(true);
      setLoader(false);
    }
  }, [rows]);
  console.log(rows);
  // if (!rowsAvailable) {
  //   return <div style={{display:"flex",justifyContent:"center",alignItem:"center"}}>No Record found.</div>;
  // }
  let monthArray = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"]
  

  
  return (
    <>
    <h6 style={{margin:16}}>Your Playing History</h6>
    <TableContainer component={Paper}>
    
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{color:"gray",fontSize:18}}>Game Image</TableCell>
            <TableCell sx={{color:"gray",fontSize:18}} align="center">Game Name</TableCell>
            <TableCell  sx={{color:"gray",fontSize:18}}align="center">Date</TableCell>
            <TableCell  sx={{color:"gray",fontSize:18}}align="center">Entry Fees</TableCell>
            <TableCell  sx={{color:"gray",fontSize:18}}align="center">Winning Amount</TableCell>
            <TableCell  sx={{color:"gray",fontSize:18}}align="center">Status</TableCell>
          </TableRow>
          
        </TableHead>
        <TableBody>
          
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
           
                <div style={{width:"100%",textAlign:"center"}}><img style={{ height: 50,width:50,borderRadius:"50%", }} src={row.gameImage}></img></div>
                     
              </TableCell>
              <TableCell align="center" sx={{fontSize:18}}>{row.gameName}</TableCell>
              <TableCell align="center" sx={{fontSize:18}}>{monthArray[new Date(row.date).getMonth()]+" "+ new Date(row.date).getDate()+", "+ new Date(row.date).getFullYear()}</TableCell>
              <TableCell align="center" sx={{fontSize:18}}>{row.entryFee}</TableCell>
              <TableCell align="center" sx={{fontSize:18}}>{row.winningAmount}</TableCell>
              <TableCell align="center" >{
              row.status?<div style={{color:"green",fontSize:20}}>Won</div>:<div style={{color:"red",fontSize:20}}>Loss</div>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    {loader && <div style={{width:"100%",display:"flex",justifyContent:"center",padding:50}}><CircularProgress sx={{textAlign:"center"}}/></div>}
    </TableContainer>
    </>
  );
}