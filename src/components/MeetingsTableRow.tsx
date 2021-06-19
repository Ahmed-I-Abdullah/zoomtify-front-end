import React, { useState } from "react";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { MeetingStatus } from "../models/Enums";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Meeting from "../models/Meeting";
import Contact from "../models/Contact";

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
  const { id, link, message, name, notified_contacts, start_date_time } = tableRow;
  const [rowOpen, setRowOpen] = useState(false);
  const classes = useStyles();
  console.log("table row is: ", tableRow);
  console.log("contacts are: ", contacts);
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
            <IconButton aria-label="view" color="primary">
              <VisibilityIcon />
            </IconButton>
            <IconButton aria-label="edit" color="primary">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" color="primary">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6}>
          <Collapse in={rowOpen} timeout="auto" unmountOnExit>
            <Autocomplete
              multiple
              options={notified_contacts}
              disableCloseOnSelect
              getOptionLabel={(option) => option.toString()}
              defaultValue={[...notified_contacts]}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
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
      </TableRow>
    </React.Fragment>
  );
};

export default MeetingsTableRow;
