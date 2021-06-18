import React, { useState } from "react";
import { makeStyles, Paper, TextField, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import clientInstance from '../httpClient';

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
    height: "600px",
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
    textDecoration: "none",
  },
}));

const SignUpForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [emailText, setEmailText] = useState("");
  const [nameText, setNameText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    clientInstance
			.post('users/signup/', {
				email: emailText,
				name: nameText,
				password: passwordText,
			})
			.then((res) => {
				history.push('/login');
				console.log("Signup post response: ", res);
			}).catch((err) => console.log("Signup post error: ", err));
  };
  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paperContainer}>
        <div className={classes.headerContainer}>
          <div className={classes.innerHeader}>
          <Link className={classes.innerHeader} to="/landing">
            <img
              src={Logo}
              style={{ height: "50px", marginRight: "15px" }}
              alt="Logo"
            />
            <h2 style={{ color: "#ffffff", fontSize: "2.3em" }}>Zoomtify</h2>
            </Link>
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
            Sign Up
          </h1>
          <p style={{ fontSize: "1.4em" }}>To continue using this app</p>
          <form style={{width: '100%'}} onSubmit={handleSubmit}>
          <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
            <TextField
              style={{ width: "80%", margin: "20px 0px" }}
              value={emailText}
              onChange={(e) => setEmailText(e.target.value.trim())}
              label="Email"
              type="email"
              required
            />
            <TextField
              style={{ width: "80%", margin: "20px 0px" }}
              value={nameText}
              onChange={(e) => setNameText(e.target.value.trim())}
              label="Name"
              required
            />
            <TextField
              style={{ width: "80%", margin: "20px 0px" }}
              value={passwordText}
              onChange={(e) => setPasswordText(e.target.value.trim())}
              label="Password"
              type="password"
              required
            />
            
            <Button
              style={{ marginTop: "40px", width: "50%" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Sign Up
            </Button>
            </Grid>
          </form>
          <p style={{marginTop: '10px'}}>Already have an account?<a href='/login'> login</a></p>
        </Grid>
      </Paper>
    </div>
  );
};

export default SignUpForm;
