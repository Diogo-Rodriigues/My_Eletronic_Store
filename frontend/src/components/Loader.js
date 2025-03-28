import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", 
    height: "auto",
    minHeight: "150px",
    position: "relative",
    backgroundColor: "rgba(10, 10, 18, 0.75)",
    backdropFilter: "blur(5px)",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
    border: "1px solid rgba(0, 183, 255, 0.3)",
  },
  circuitLines: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    background: "linear-gradient(45deg, transparent 48%, rgba(0, 183, 255, 0.1) 48%, rgba(0, 183, 255, 0.1) 52%, transparent 52%)",
    backgroundSize: "20px 20px",
    opacity: 0.3,
    pointerEvents: "none",
    borderRadius: "8px",
  },
  progressWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  circularProgress: {
    color: "#00b7ff",
    boxShadow: "0 0 10px rgba(0, 183, 255, 0.4)",
  },
  loadingText: {
    marginTop: 15,
    fontFamily: "'Orbitron', 'Roboto', sans-serif",
    color: "#00b7ff",
    fontSize: "0.9rem",
    letterSpacing: "1px",
    textShadow: "0 0 3px rgba(0, 183, 255, 0.5)",
    animation: "$pulse 1.5s infinite ease-in-out",
    zIndex: 1,
  },
  "@keyframes pulse": {
    "0%": {
      opacity: 0.6,
    },
    "50%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0.6,
    },
  },
  glowingRing: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: "50%",
    border: "1px solid transparent",
    borderTopColor: "#00e676",
    animation: "$spinRing 2s linear infinite",
  },
  secondRing: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: "50%",
    border: "1px solid transparent",
    borderRightColor: "#00b7ff",
    animation: "$spinRingReverse 1.5s linear infinite",
  },
  "@keyframes spinRing": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  "@keyframes spinRingReverse": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(-360deg)",
    },
  },
  progressText: {
    position: "absolute",
    fontSize: "0.7rem",
    color: "#f5f5f5",
    textAlign: "center",
    animation: "$fadeInOut 2s infinite",
  },
  "@keyframes fadeInOut": {
    "0%": {
      opacity: 0.2,
    },
    "50%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0.2,
    },
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <Box className={classes.loaderContainer}>
      <div className={classes.circuitLines}></div>
      <div className={classes.progressWrapper}>
        <div className={classes.glowingRing}></div>
        <div className={classes.secondRing}></div>
        <CircularProgress 
          size={50} 
          thickness={3} 
          className={classes.circularProgress} 
        />
        <Typography variant="caption" className={classes.progressText}>
          Loading
        </Typography>
      </div>
      <Typography variant="body2" className={classes.loadingText}>
        PROCESSING
      </Typography>
    </Box>
  );
}
