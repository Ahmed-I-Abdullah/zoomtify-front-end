import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import Meeting from "../models/Meeting";
import Token from '../models/Token';
import DateFnsUtils from "@date-io/date-fns";
import clientInstance from "../httpClient";
import jwt_decode from "jwt-decode";
import ZoomtifyContext from "../contexts/ZoomtifyContext";
import moment from 'moment';

interface AddEditMeetingProps {
  add: boolean;
  meeting?: Meeting;
  open: boolean;
  setOpen: Function;
}

const useStyles = makeStyles({
  error: {
    color: "#ff0000",
  },
});

const AddEditMeeting: React.FC<AddEditMeetingProps> = ({
  add,
  meeting,
  open,
  setOpen,
}) => {
  const classes = useStyles();
  const { meetings, setMeetings, fetchMeetings } = useContext(ZoomtifyContext);
  const [meetingName, setMeetingName] = useState(meeting?.name || "");
  const [url, setUrl] = useState(meeting?.link || "");
  const [message, setMessage] = useState(meeting?.message || "");
  const [startDate, setStartDate] = useState<string | Date | null>(
    meeting?.start_date_time || null
  );
  const [errors, setErrors] = useState({
    meetingName: "",
    url: "",
    startDate: "",
  });

  const decodedToken: Token = jwt_decode(localStorage.getItem("access") || "");

  const resetErrors = () => setErrors({ meetingName: "", url: "", startDate: "" });
  const resetData = () => {
    setMeetingName("");
    setUrl("");
    setMessage("");
    setStartDate(null);
  };

  const handleCancel = () => {
    setOpen(false);
    resetData();
    resetErrors();
  }


  const validateData = () => {
    resetErrors();
    let isValid = true;
    if (!meetingName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        meetingName: "Meeting must have a name.",
      }));
      isValid = false;
    }
    if (!url) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        url: "Meeting must have a url.",
      }));
      isValid = false;
    }
    if (!startDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        startDate: "Meeting must have a valid start time.",
      }));
      isValid = false;
    }
    return isValid;
  };

  const handleCreatMeeting = () => {
    if (!validateData()) return;
    const newMeeting = {
      link: url,
      message: message,
      name: meetingName,
      notified_contacts: [],
      start_date_time:
        typeof startDate === "string" ? startDate : startDate?.toISOString(),
      user: decodedToken.user_id,
    };
    console.log("new meeting is: ", newMeeting);
    clientInstance
      .post("meetings", newMeeting)
      .then((resp) => {
        console.log("created meeting, with response: ", resp);
        resetErrors();
        setMeetings( meetings ? [...meetings, resp.data] : [resp.data]);
        setOpen(false);
        resetData();
      })
      .catch((err) => console.log("error creating meeting: ", err));
  };

  const handleUpdateMeeting = () => {
    if (!validateData() || !meeting) return;
    const updatedMeeting = {
      link: url,
      message: message,
      name: meetingName,
      notified_contacts: meeting.notified_contacts,
      start_date_time:
        typeof startDate === "string" ? startDate : startDate?.toISOString(),
      user: meeting.user,
    };
    clientInstance.put(`meetings/` + meeting.id + '/', updatedMeeting).then((resp) => {
      console.log("updated meeting, with response: ", resp);
        resetErrors();
        fetchMeetings();
        setOpen(false);
    });
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle id="form-dialog-title">
        {add ? "Add Meeting" : "Edit Meeting"}
      </DialogTitle>
      <DialogContent>
        <Grid container direction="row">
          <Grid item container>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Meeting Name"
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
              />
              <div className={classes.error}>{errors.meetingName}</div>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  label="Start Time"
                  format="yyyy-MM-dd hh:mm a"
                  value={startDate}
                  onChange={(selectedDate) => {
                    setStartDate(moment(selectedDate).format());
                  }}
                />
              </MuiPickersUtilsProvider>
              <div className={classes.error}>{errors.startDate}</div>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <div className={classes.error}>{errors.url}</div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={add ? handleCreatMeeting : handleUpdateMeeting}
          color="primary"
        >
          {add ? "Create" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditMeeting;
