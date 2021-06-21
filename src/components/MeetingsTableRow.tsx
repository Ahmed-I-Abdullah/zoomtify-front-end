import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  makeStyles,
  TableCell,
  Collapse,
  IconButton,
  Checkbox,
  TextField,
  TableRow,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { MeetingStatus } from "../models/Enums";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Meeting from "../models/Meeting";
import Contact from "../models/Contact";
import AddEditMeeting from './AddEditMeeting';
import DeleteItem from './DeleteItem';
import clientInstance from '../httpClient';
import ZoomtifyContext from '../contexts/ZoomtifyContext';


interface ContactsArray extends Array<Contact> {}

interface MeetingsTableRowProps {
  tableRow: Meeting;
  contacts: ContactsArray | null;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "86%",
    margin: "30px 7%",
    height: "100%",
  },
}));

const MeetingsTableRow: React.FC<MeetingsTableRowProps> = ({ tableRow, contacts }) => {
  const { id, link, message, name, notified_contacts, start_date_time, user } = tableRow;
  const { fetchMeetings } = useContext(ZoomtifyContext);
  const [rowOpen, setRowOpen] = useState(false);
  const classes = useStyles();
  const [addEditOpen, setAddEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  
  const handleUpdateMeetingContacts = (selectedContacts: Contact[]) => {
    const contactsIds = selectedContacts.map((contact) => contact.id);
    const updatedMeeting = {
      link: link,
      message: message,
      name: name,
      notified_contacts: contactsIds,
      start_date_time: start_date_time,
      user: user,
    };
    clientInstance.put(`meetings/` + id + '/', updatedMeeting).then((resp) => {
      console.log("updated meeting, with response: ", resp);
        fetchMeetings();
    });
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setRowOpen(!rowOpen)}>
            {rowOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{start_date_time}</TableCell>
        <TableCell align="center">
          <a href={link} target="_blank">
            {link}
          </a>
        </TableCell>
        <TableCell align="center">{message}</TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">
          <Grid container direction="row">
            <IconButton aria-label="edit" color="primary" onClick={() => setAddEditOpen(true)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" color="primary" onClick={() => setDeleteOpen(true)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        {contacts && (
          <TableCell colSpan={6}>
          <Collapse in={rowOpen} timeout="auto" unmountOnExit>
            <Autocomplete
              multiple
              options={contacts}
              disableCloseOnSelect
              getOptionLabel={(option) => option.first_name + " " + option.last_name}
              defaultValue={notified_contacts.map((contactId) => contacts?.filter((contact) => contact.id === contactId)[0])}
              onChange={(e, contacts) => {
                handleUpdateMeetingContacts(contacts);
              }}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.first_name + " " + option.last_name}
                </React.Fragment>
              )}
              style={{ width: "50%" }}
              renderInput={(params) => (
                <TextField
                  margin="dense"
                  {...params}
                  variant="outlined"
                  label="Contacts to notify"
                  placeholder="edit contacts"
                />
              )}
            />
          </Collapse>
        </TableCell>
        )}
      </TableRow>
      <AddEditMeeting add={false} meeting={tableRow} open={addEditOpen} setOpen={setAddEditOpen} />
      <DeleteItem isMeeting={true} meeting={tableRow} open={deleteOpen} setOpen={setDeleteOpen}/>
    </React.Fragment>
  );
};

export default MeetingsTableRow;
