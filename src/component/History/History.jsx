import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "gameImage", label: "Game Image", minWidth: 170 },
  { id: "gameName", label: "Game Name", minWidth: 100 },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "entryFee",
    label: "Entry Fee",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "winningAmount",
    label: "WinningAmount",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
];

function createData(
  gameImage,
  gameName,
  date,
  entryFee,
  status,
  winningAmount
) {
  //   const density = population / size;
  return { gameImage, gameName, date, entryFee, status, winningAmount };
}

// const rows = [
//   createData('India', 'IN', "1324171354", "3287263","90","20"),
//   createData('China', 'CN', 1403500365, 9596961,10,20),
//   createData('Italy', 'IT', 60483973, 301340,10,20),
//   createData('United States', 'US', 327167434, 9833520,10,20),
//   createData('Canada', 'CA', 37602103, 9984670,10,20),
//   createData('Australia', 'AU', 25475400, 7692024,10,20),
//   createData('Germany', 'DE', 83019200, 357578,10,20),
//   createData('Ireland', 'IE', 4857000, 70273,10,20),
//   createData('Mexico', 'MX', 126577691, 1972550,10,20),
//   createData('Japan', 'JP', 126317000, 377973,10,20),
//   createData('France', 'FR', 67022000, 640679,10,20),
//   createData('United Kingdom', 'GB', 67545757, 242495,10,20),
//   createData('Russia', 'RU', 146793744, 17098246,10,20),
//   createData('Nigeria', 'NG', 200962417, 923768,10,20),
//   createData('Brazil', 'BR', 210147125, 8515767),10,20,
// ];
// const rows=[]

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const userHistoryDataf = [
  {
    gameImage: "https:",
    gameName: "Pubg",
    date: "2021-11-08T08:33:54.613Z",
    entryFee: 10,
    status: false,
    winningAmount: 0,
  },
  {
    gameImage: "https:",
    gameName: "Pubg",
    date: "2021-11-08T08:33:54.613Z",
    entryFee: 10,
    status: false,
    winningAmount: 0,
  },
  //  {
  //     "gameImage": "https:",
  //     "gameName": "Pubg",
  //     "date": "2021-11-08T08:33:54.613Z",
  //     "entryFee": 10,
  //     "status": false,
  //     "winningAmount": 0
  // },
  {
    gameImage: "https:",
    gameName: "Pubg",
    date: "2021-11-08T08:33:54.613Z",
    entryFee: 10,
    status: false,
    winningAmount: 0,
  },
];

export default function History(props) {
  const [rows, setRows] = React.useState(props.userHistoryData);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowsAvailable, setRowsAvailable] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    setRows(props.userHistoryData);

    console.log(
      "===============================================rows here====================================="
    );
  }, []);
  React.useEffect(() => {
    if (rows.length > 0) {
      setRowsAvailable(true);
    }
  }, [rows]);
  console.log(rows);
  if (!rowsAvailable) {
    return <div>table is empty.</div>;
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      if (column.id == "gameImage") {
                        // return <img style={{height:50}} src={value}></img>
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <img style={{ height: 50 }} src={value}></img>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}

                          {console.log(row[0])}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
