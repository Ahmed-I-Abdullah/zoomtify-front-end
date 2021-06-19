import React from "react";
import { Grid, makeStyles, Button, useTheme } from "@material-ui/core";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useHistory } from "react-router";
import MeetingDemo from "../assets/virtualMeeting.svg";

interface LandingProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1A1D",
  },
}));

const Landing: React.FC<LandingProps> = ({}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <NavBar showLogIn={true} />
      <Grid
        style={{
          width: "86%",
          margin: "80px 7%",
        }}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item sm={12} md={6} lg={6}>
          <h1 style={{ color: "#ffffff", fontSize: "3.6em" }}>
            Never get interrupted during your{" "}
            <span style={{ color: theme.palette.primary.main }}>zoom</span>{" "}
            meetings again
          </h1>
          <p style={{ color: "#79797B", fontSize: "2em", marginTop: "5vh" }}>
            Automatically join your mettings and notify your roommates about
            your meeting.
          </p>
          <Button
            style={{
              marginTop: "80px",
              fontSize: "2em",
              borderRadius: "20px",
              padding: "15px 35px",
            }}
            variant="contained"
            color="primary"
            onClick={() => history.push("/signup")}
          >
            Get Started
          </Button>
        </Grid>
        <Grid
          container
          style={{ width: "100%", height: "100%" }}
          item
          xs={12}
          sm={10}
          md={6}
          lg={6}
          justify="flex-end"
          alignItems="flex-start"
        >
          <img
            src={MeetingDemo}
            style={{ width: "80%", marginTop: "4vh" }}
            alt="virtual meeting"
          />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Landing;
