import React from "react";
import { makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";

interface LandingProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundColor: '#1A1A1D',
  },
}));

const Landing: React.FC<LandingProps> = ({}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar showLogIn={true} />
    </div>
  );
};

export default Landing;
