import React from "react";
import { Typography, Box } from "@material-ui/core";
import { Star, StarHalf, StarBorder } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  starsContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(0.5),
  },
  starIcon: {
    filter: "drop-shadow(0 0 3px rgba(0, 230, 118, 0.7))",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  reviewText: {
    color: "#aaa",
    fontSize: "0.8rem",
    letterSpacing: "0.5px",
  },
}));

function Rating({ value, text, color = "#00e676" }) {
  const classes = useStyles();

  return (
    <Box className={classes.ratingContainer}>
      <Box className={classes.starsContainer}>
        <Box mr={0.5}>
          {value >= 1 ? (
            <Star style={{ color }} fontSize="small" className={classes.starIcon} />
          ) : value >= 0.5 ? (
            <StarHalf style={{ color }} fontSize="small" className={classes.starIcon} />
          ) : (
            <StarBorder style={{ color }} fontSize="small" className={classes.starIcon} />
          )}
        </Box>

        <Box mr={0.5}>
          {value >= 2 ? (
            <Star style={{ color }} fontSize="small" className={classes.starIcon} />
          ) : value >= 1.5 ? (
            <StarHalf style={{ color }} fontSize="small" className={classes.starIcon} />
          ) : (
            <StarBorder style={{ color }} fontSize="small" className={classes.starIcon} />
          )}
        </Box>

        <Box mr={0.5}>
          {value >= 3 ? (
            <Star style={{ color }} fontSize="small" className={classes.starIcon} />
          ) : value >= 2.5 ? (
            <StarHalf style={{ color }} fontSize="small" className={classes.starIcon} />
          ) : (
            <StarBorder style={{ color }} fontSize="small" className={classes.starIcon} />
          )}
        </Box>

        <Box mr={0.5}>
          {value >= 4 ? (
            <Star style={{ color }} fontSize="small" className={classes.starIcon} />
          ) : value >= 3.5 ? (
            <StarHalf style={{ color }} fontSize="small" className={classes.starIcon} />
          ) : (
            <StarBorder style={{ color }} fontSize="small" className={classes.starIcon} />
          )}
        </Box>

        <Box mr={0.5}>
          {value >= 5 ? (
            <Star style={{ color }} fontSize="small" className={classes.starIcon} />
          ) : value >= 4.5 ? (
            <StarHalf style={{ color }} fontSize="small" className={classes.starIcon} />
          ) : (
            <StarBorder style={{ color }} fontSize="small" className={classes.starIcon} />
          )}
        </Box>
      </Box>
      {text && <Typography variant="subtitle2" className={classes.reviewText}>{text}</Typography>}
    </Box>
  );
}

export default Rating;
