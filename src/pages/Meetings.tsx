import React from "react";
import { makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import MeetingsTable from "../components/MeetingsTable";
import ContactsTable from "../components/ContactsTable";

interface MeetingsProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#ffffff",
  },
}));

export const Meetings: React.FC<MeetingsProps> = ({}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar showLogIn={false} />
      <MeetingsTable />
      <ContactsTable />
      <div style={{height: '100px'}}/>
    </div>
  );
};
