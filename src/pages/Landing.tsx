import React from "react";
import {
  Grid,
  makeStyles,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useHistory } from "react-router";
import MeetingDemo from "../assets/virtualMeeting.svg";
import Waves from "../assets/waves.svg";
import SmallWaves from "../assets/smallWaves.svg";

interface LandingProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1A1D",
  },
  listItem: {
    margin: "15px 0px",
  },
}));

const Landing: React.FC<LandingProps> = ({}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <div className={classes.root}>
      <div style={{ width: "100%", minHeight: "100vh" }}>
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
      </div>
      <div
        id="about"
        style={{
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          backgroundColor: "#131314",
        }}
      >
        <Grid
          style={{
            width: "100%",
            paddingLeft: "7%",
          }}
          container
          direction="row"
          justify="space-between"
        >
          <Grid
            style={{
              height: "100%",
              zIndex: 10,
              marginTop: "50px",
            }}
            md={6}
            sm={8}
            xs={12}
          >
            <h1
              style={{
                font: "Racing Sans One",
                fontSize: "3.5em",
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              About Us
            </h1>
            <div>
              <p
                style={{
                  color: "#ffffff",
                  fontSize: "1.6em",
                  marginTop: "50px",
                  marginRight: "7%",
                }}
              >
                COVID-19 has changed our lives drastically over the past
                two years. Most importantly, it has changed the way we work and
                interact with people to become fully virtual. With that came
                lots of challenges. We can no longer have the quietness
                available in the office, and we now have to keep track of tens
                of meetings' links daily, making organization much harder. We
                aim to enhance the experience of online meetings with this
                application through:
                <ul style={{ marginLeft: "8%", marginTop: "30px" }}>
                  <li className={classes.listItem}>
                    Automatically joinning your meetings
                  </li>
                  <li className={classes.listItem}>
                    Notifying your roommates about your meetings' times along
                    with a message of your choice
                  </li>
                  <li className={classes.listItem}>
                    Keeping all your links organized in one place
                  </li>
                </ul>
              </p>
            </div>
          </Grid>
          {!isExtraSmall && (
            <img
              src={isSmall ? SmallWaves : Waves}
              style={{ height: "100%", position: "absolute", right: 0 }}
              alt="waves"
            />
          )}
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
