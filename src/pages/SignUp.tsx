import React from "react";
import { makeStyles } from "@material-ui/core";
import SignUpForm from "../components/SignUpForm";
import Background from "../assets/background.svg";
// import clientInstance from '../httpClient';
import { useHistory } from 'react-router-dom';

interface SignUpProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    minHeight: 700,
    backgroundImage: "url(" + Background + ")",
  },
}));

const SignUp: React.FC<SignUpProps> = ({}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
