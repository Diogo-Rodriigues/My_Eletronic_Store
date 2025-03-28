import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {Button,TextField,Grid,Typography,Container} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/slices/userSlice";

import Message from "../components/Message";
import Loader from "../components/Loader";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#00b7ff",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#00e676",
    },
  },
  textField: {
    "& .MuiFilledInput-root": {
      backgroundColor: "rgba(40, 40, 40, 0.8)",
    },
    "& .MuiFilledInput-input": {
      color: "#f5f5f5",
      fontWeight: "500",
    },
    "& .MuiInputLabel-filled": {
      color: "#f5f5f5",
      fontWeight: "500",
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "rgba(50, 50, 50, 0.9)",
    },
    "& .MuiInputLabel-filled.Mui-focused": {
      color: "#00b7ff",
    },
  },
  registerTitle: {
    color: "#00b7ff",
    textShadow: "0 0 5px rgba(0, 183, 255, 0.4)",
    marginBottom: theme.spacing(2),
  },
  link: {
    color: "#00b7ff",
    fontWeight: "500",
    marginLeft: theme.spacing(1),
    "&:hover": {
      color: "#00e676",
      textDecoration: "none",
    },
  },
  loginText: {
    color: "#f5f5f5",
  },
}));

function RegisterScreen({ location, history }) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { userDetails, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userDetails) {
      history.push(redirect);
    }
  }, [history, userDetails, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password does not match");
    } else {
      dispatch(createUser( name, email, password ));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={`${classes.paper} register-container circuit-advanced`}>
        <Typography component="h1" className={classes.registerTitle} variant="h5">
          Register
        </Typography>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={classes.textField}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={`${classes.submit} btn-tech-pulse`}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Typography variant="body2" className={classes.loginText} display="inline">
                Already have an account?
              </Typography>
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className={classes.link}
              >
                Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default RegisterScreen;
