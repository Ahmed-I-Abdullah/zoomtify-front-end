import React from "react";
import { makeStyles } from "@material-ui/core";
import LogInForm from "../components/LogInForm";
import Background from "../assets/background.svg";

interface LogInProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    minHeight: 700,
    backgroundImage: 'url(' + Background + ')',
  },
}));

const LogIn: React.FC<LogInProps> = ({}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LogInForm />
    </div>
  );
};

export default LogIn;
