import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import MeetingsTable from "../components/MeetingsTable";
import ContactsTable from "../components/ContactsTable";
import Footer from "../components/Footer";
import { useHistory } from "react-router";
import Background from "../assets/background.svg";
import ZoomtifyContext from "../contexts/ZoomtifyContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    backgroundImage: "url(" + Background + ")",
  },
}));

const Meetings: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { meetings, contacts, fetchMeetings, fetchContacts, loading } = useContext(ZoomtifyContext);

  useEffect(() => {
    if(!localStorage.getItem('access')) {
      history.push('/login');
    }
    fetchMeetings();
    fetchContacts();
  }, []);
  return (
    <div className={classes.root}>
    {localStorage.getItem("access") ? (
      <>
      <NavBar showLogIn={false} />
      <MeetingsTable meetings={meetings} loading={loading} contacts={contacts} />
      <ContactsTable loading={loading} contacts={contacts} />
      <Footer />
      </>
    ) : null}
    </div>
  );
};

export default Meetings;
