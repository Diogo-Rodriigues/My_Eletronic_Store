import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  login
 
} from "../redux/slices/userSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
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
  loginTitle: {
    color: "#00b7ff",
    textShadow: "0 0 5px rgba(0, 183, 255, 0.4)",
    marginBottom: theme.spacing(2),
  },
  link: {
    color: "#00b7ff",
    fontWeight: "500",
    "&:hover": {
      color: "#00e676",
      textDecoration: "none",
    },
  },
}));

function LoginScreen({ location, history }) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.user);
  const { userDetails, loading, error } = userLogin;

  useEffect(() => {
    if (userDetails) {
      history.replace(redirect);
    }
  }, [history, userDetails, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password)
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <div className="login-container form-tech-pattern">
        <Typography component="h1" variant="h5" className={classes.loginTitle}>
          Login
        </Typography>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            Enter
          </Button>
          <Grid container justify="flex-start">
            <Grid item>
              <Typography variant="body2" style={{color: "#f5f5f5", marginRight: "5px", display: "inline-block"}}>
                New user?
              </Typography>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className={classes.link}
              >
                Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </FormContainer>
  );
}

export default LoginScreen;
