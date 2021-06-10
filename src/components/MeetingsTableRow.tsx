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

interface ContactItem {
  name: string;
}

interface ContactItems extends Array<ContactItem> {}

interface MeetingsTableRowProps {
  tableRow: {
    meetingName: string;
    startTime: Date;
    url: string;
    message: string;
    status: MeetingStatus;
    contacts: ContactItems;
  };
}

const allContacts = [
  {
    name: "Omar Ibrahim",
  },
  {
    name: "Mohammed al",
  },
  {
    name: "Test Contact",
  },
  {
    name: "Youssef Random",
  },
  {
    name: "Ahmed Abdullah",
  },
  {
    name: "Jack son",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "86%",
    margin: "30px 7%",
    height: "100%",
  },
}));

const MeetingsTableRow: React.FC<MeetingsTableRowProps> = ({ tableRow }) => {
  const { meetingName, startTime, url, message, status, contacts } = tableRow;
  const [rowOpen, setRowOpen] = useState(false);
  const classes = useStyles();
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setRowOpen(!rowOpen)}>
            {rowOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{meetingName}</TableCell>
        <TableCell align="center">{startTime.toISOString()}</TableCell>
        <TableCell align="center">
          <a href={url} target="_blank">
            {url}
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
              options={allContacts.filter(
                (contact) =>
                  !contacts.map((value) => value.name).includes(contact.name)
              )}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              defaultValue={[...contacts]}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
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
