import React from "react";
import { makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import MeetingsTable from "../components/MeetingsTable";
import ContactsTable from "../components/ContactsTable";
import Footer from '../components/Footer';
import Meeting from '../models/Meeting';

interface MeetingsProps {
  meetings: MeetingsArray | null;
  loading: boolean;
}

interface MeetingsArray extends Array<Meeting>{}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#ffffff",
  },
}));

export const Meetings: React.FC<MeetingsProps> = ({ meetings, loading}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar showLogIn={false} />
      <MeetingsTable />
      <ContactsTable />
      <Footer />
    </div>
  );
};
