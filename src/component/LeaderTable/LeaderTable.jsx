import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./LeaderTable.css"
import CircularProgress from '@mui/material/CircularProgress';

export default function LeaderTable(props) {
  const [rows, setRows] = React.useState(props.leaderData);
  const [rowsAvailable, setRowsAvailable] = React.useState(false);
  const [loader, setLoader]=React.useState(true);
    React.useEffect(() => {
    setRows(props.leaderData);
  }, [props.leaderData]);

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
    <div className="leader-table">
    <h6 style={{margin:16}}>All Users</h6>
    <TableContainer component={Paper}>
    
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  sx={{color:"gray",fontSize:18}}align="center">Rank</TableCell>
            <TableCell sx={{color:"gray",fontSize:18}} align="center">User Profile</TableCell>
            <TableCell sx={{color:"gray",fontSize:18}} align="center">User Name</TableCell>
            <TableCell  sx={{color:"gray",fontSize:18}}align="center">User Email</TableCell>
            <TableCell  sx={{color:"gray",fontSize:18}}align="center">Wallet</TableCell>
            <TableCell  sx={{color:"gray",fontSize:18}}align="center">Match Won</TableCell>
          </TableRow>
          
        </TableHead>
        <TableBody>
          
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" sx={{fontSize:18}}>{row.rank}</TableCell>

              <TableCell component="th" scope="row">
           
                <div style={{width:"100%",textAlign:"center"}}><img style={{ height: 50,width:50,borderRadius:"50%", }} src={row.image|| "http://svgur.com/i/65U.svg"}></img></div>
                     
              </TableCell>
              <TableCell align="center" sx={{fontSize:18}}>{row.name || "Player name"}</TableCell>
              <TableCell align="center" sx={{fontSize:18}}>{row.email}</TableCell>
              <TableCell align="center" sx={{fontSize:18}}>{"$ " + row.amount}</TableCell>
              <TableCell align="center" >{
              <div style={{color:"green",fontSize:20}}>{row.won}</div>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    {loader && <div style={{width:"100%",display:"flex",justifyContent:"center",padding:50}}><CircularProgress sx={{textAlign:"center"}}/></div>}
    </TableContainer>
    </div>
  );
}