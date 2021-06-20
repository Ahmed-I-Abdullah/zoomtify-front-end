import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import Meeting from "../models/Meeting";
import DateFnsUtils from "@date-io/date-fns";

interface AddEditMeetingProps {
  add: boolean;
  meeting?: Meeting;
  open: boolean;
  setOpen: Function;
}

const AddEditMeeting: React.FC<AddEditMeetingProps> = ({ add, meeting, open, setOpen }) => {
    console.log("received meeting is: ", meeting);
  const [meetingName, setMeetingName] = useState(meeting?.name || "");
  const [url, setUrl] = useState(meeting?.link || "");
  const [message, setMessage] = useState(meeting?.message || "");
  const [startDate, setStartDate] = useState<string | Date | null>( meeting?.start_date_time || null);

  const handleCreatMeeting = () => {};

  const handleUpdateMeeting = () => {};

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
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
                onChange={(e) => setMeetingName(e.target.value.trim())}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  label="Start Time"
                  format="yyyy-MM-dd hh:mm a"
                  value={startDate}
                  onChange={(selectedDate) => setStartDate(selectedDate)}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={6}>
              <TextField autoFocus margin="dense" label="Url" value={url}
                onChange={(e) => setUrl(e.target.value.trim())} />
            </Grid>
            <Grid item xs={6}>
              <TextField autoFocus margin="dense" label="Message" value={message}
                onChange={(e) => setMessage(e.target.value.trim())} />
            </Grid>
          </Grid>
        </Grid>
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
