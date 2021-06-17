import React, { useState } from "react";
import { makeStyles, Paper, TextField, Grid, Button } from "@material-ui/core";
import Logo from "../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperContainer: {
    width: "400px",
    height: "510px",
  },
  headerContainer: {
    width: "100%",
    height: "90px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
  },
  innerHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyItems: "center",
    height: "100%",
    width: "fit-content",
  },
}));

const LogInForm: React.FC = () => {
  const classes = useStyles();
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paperContainer}>
        <div className={classes.headerContainer}>
          <div className={classes.innerHeader}>
            <img
              src={Logo}
              style={{ height: "50px", marginRight: "15px" }}
              alt="Logo"
            />
            <h2 style={{ color: "#ffffff", fontSize: "2.3em" }}>Zoomtify</h2>
          </div>
        </div>
        <Grid
          style={{ margin: "35px 0px 45px 0px" }}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <h1
            style={{
              width: "fit-content",
              fontWeight: "bold",
              fontSize: "2.0em",
            }}
          >
            Log In
          </h1>
          <p style={{ fontSize: "1.4em" }}>Welcome Back!</p>
          <TextField
            style={{ width: "80%", margin: "20px 0px" }}
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            label="Email"
          />
          <TextField
            style={{ width: "80%", margin: "20px 0px" }}
            value={passwordText}
            onChange={(e) => setPasswordText(e.target.value)}
            label="Password"
          />
          <Button
            style={{ marginTop: "50px", width: "50%" }}
            variant="contained"
            color="primary"
          >
            Log In
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default LogInForm;
