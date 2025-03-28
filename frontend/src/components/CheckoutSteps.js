import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CheckCircle, RadioButtonUnchecked, NavigateNext } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  stepsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: "8px",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    boxShadow: "0 0 10px rgba(0, 183, 255, 0.2)",
    border: "1px solid rgba(0, 183, 255, 0.2)",
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: "rgba(245, 245, 245, 0.7)",
    textDecoration: "none",
    padding: theme.spacing(0.5, 1),
    borderRadius: "4px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(0, 183, 255, 0.1)",
      color: "#00b7ff",
    },
  },
  activeLink: {
    color: "#00e676",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "rgba(245, 245, 245, 0.5)",
  },
  stepIcon: {
    marginRight: theme.spacing(1),
  },
  separator: {
    color: "rgba(0, 183, 255, 0.5)",
  },
  completedIcon: {
    color: "#00e676",
    animation: "$pulse 2s infinite",
  },
  pendingIcon: {
    color: "rgba(245, 245, 245, 0.5)",
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
}));

function CheckoutSteps({ step1, step2, step3, step4 }) {
  const classes = useStyles();

  return (
    <Box className={classes.stepsContainer}>
      <Breadcrumbs 
        aria-label="checkout process" 
        separator={<NavigateNext className={classes.separator} />}
      >
        <Link
          to="/login"
          className={`${classes.link} ${step1 ? classes.activeLink : ""}`}
        >
          {step1 ? (
            <CheckCircle className={`${classes.stepIcon} ${classes.completedIcon}`} fontSize="small" />
          ) : (
            <RadioButtonUnchecked className={`${classes.stepIcon} ${classes.pendingIcon}`} fontSize="small" />
          )}
          {step1 ? "Sign In" : "Sign In (Incomplete)"}
        </Link>

        <Link
          to="/shipping"
          className={`${classes.link} ${step2 ? classes.activeLink : ""}`}
        >
          {step2 ? (
            <CheckCircle className={`${classes.stepIcon} ${classes.completedIcon}`} fontSize="small" />
          ) : (
            <RadioButtonUnchecked className={`${classes.stepIcon} ${classes.pendingIcon}`} fontSize="small" />
          )}
          {step2 ? "Shipping" : "Shipping (Incomplete)"}
        </Link>

        <Link
          to="/payment"
          className={`${classes.link} ${step3 ? classes.activeLink : ""}`}
        >
          {step3 ? (
            <CheckCircle className={`${classes.stepIcon} ${classes.completedIcon}`} fontSize="small" />
          ) : (
            <RadioButtonUnchecked className={`${classes.stepIcon} ${classes.pendingIcon}`} fontSize="small" />
          )}
          {step3 ? "Payment" : "Payment (Incomplete)"}
        </Link>

        <Typography
          className={`${classes.link} ${step4 ? classes.activeLink : classes.inactiveText}`}
        >
          {step4 ? (
            <CheckCircle className={`${classes.stepIcon} ${classes.completedIcon}`} fontSize="small" />
          ) : (
            <RadioButtonUnchecked className={`${classes.stepIcon} ${classes.pendingIcon}`} fontSize="small" />
          )}
          {step4 ? "Confirm Order" : "Confirm Order (Incomplete)"}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
}

export default CheckoutSteps;
