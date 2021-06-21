import React, { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Meeting from "../models/Meeting";
import Contact from "../models/Contact";
import ZoomtifyContext from "../contexts/ZoomtifyContext";
import clientInstance from "../httpClient";

interface AddEditMeetingProps {
  isMeeting: boolean;
  meeting?: Meeting;
  contact?: Contact;
  open: boolean;
  setOpen: Function;
}

const AddEditMeeting: React.FC<AddEditMeetingProps> = ({
  isMeeting,
  meeting,
  contact,
  open,
  setOpen,
}) => {
  const { fetchMeetings, fetchContacts } = useContext(ZoomtifyContext);
  const handleDeleteMeeting = () => {
    if (!meeting) return;
    clientInstance
      .delete("meetings/" + meeting.id)
      .then((resp) => {
        console.log("deleted meeting: ", resp);
        fetchMeetings();
        setOpen(false);
      })
      .catch((err) => console.log("error deleting meeting: ", err));
  };

  const handleDeleteContact = () => {
    if (!contact) return;
    clientInstance
      .delete("contacts/" + contact.id)
      .then((resp) => {
        console.log("deleted contact: ", resp);
        fetchContacts();
        fetchMeetings();
        setOpen(false);
      })
      .catch((err) => console.log("error deleting meeting: ", err));
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="form-dialog-title">
        {isMeeting ? "Delete Meeting" : "Delete Contact"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to{" "}
          <span style={{ color: "#ff0000", fontWeight: "bold" }}>delete</span>{" "}
          {isMeeting ? "meeting: " : "contact: "}{" "}
          <span style={{ fontWeight: "bold", color: "#000000" }}>
            {isMeeting
              ? meeting?.name
              : contact?.first_name + " " + contact?.last_name}
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={isMeeting ? handleDeleteMeeting : handleDeleteContact}
          color="primary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditMeeting;
