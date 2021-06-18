import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import MeetingsTable from "../components/MeetingsTable";
import ContactsTable from "../components/ContactsTable";
import Footer from "../components/Footer";
import { useHistory } from "react-router";
import Meeting from "../models/Meeting";
import Background from "../assets/background.svg";
import clientInstance from "../httpClient";

// interface MeetingsProps {
//   meetings: MeetingsArray | null;
//   loading: boolean;
// }

// interface MeetingsArray extends Array<Meeting> {}

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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    clientInstance
      .get("meetings")
      .then((resp) => {
        setMeetings(resp.data);
        setLoading(false);
      })
      .catch((err) => console.log("error fetching meetings", err));
  }, []);
  return (
    <div className={classes.root}>
      <NavBar showLogIn={false} />
      <MeetingsTable />
      <ContactsTable />
      <Footer />
    </div>
  );
};

export default Meetings;
