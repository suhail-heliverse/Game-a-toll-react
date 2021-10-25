import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./CircularLoader.css";

function CircularLoader() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress /> <br />
        Waiting
      </Box>
    </>
  );
}

export default CircularLoader;
