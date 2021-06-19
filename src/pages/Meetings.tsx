import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import MeetingsTable from "../components/MeetingsTable";
import ContactsTable from "../components/ContactsTable";
import Footer from "../components/Footer";
import { useHistory } from "react-router";
import Background from "../assets/background.svg";
import clientInstance from "../httpClient";

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
  const [meetings, setMeetings] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!localStorage.getItem('access')) {
      history.push('/login');
    }
    setLoading(true);
    clientInstance
      .get("meetings")
      .then((resp) => {
        setMeetings(resp.data);
      })
      .catch((err) => console.log("error fetching meetings", err));

      clientInstance
      .get("contacts")
      .then((resp) => {
        setContacts(resp.data);
        setLoading(false);
      })
      .catch((err) => console.log("error fetching contacts", err));

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
