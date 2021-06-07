import React from "react";
import { makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";

interface LandingProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "86%",
    margin: "30px 7%",
    height: "100%",
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
