import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  TableCell,
  IconButton,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Contact from '../models/Contact';
import AddEditContact from './AddEditContact';
import DeleteItem from './DeleteItem';

interface ContactsTableRowProps {
    contactsRow: Contact
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: "86%",
      margin: "30px 7%",
      height: "100%",
    },
  }));

const ContactsTableRow: React.FC<ContactsTableRowProps> = ({ contactsRow }) => {
    const { first_name, last_name, phone_number } = contactsRow;
    const classes = useStyles();
    const [addEditOpen, setAddEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
    return (
      <React.Fragment>
        <TableRow>
          <TableCell align="center">{first_name}</TableCell>
          <TableCell align="center">{last_name}</TableCell>
          <TableCell align="center">{phone_number}</TableCell>
          <TableCell align="center">
            <Grid container direction="row" justify="center">
              <IconButton aria-label="edit" color="primary" onClick={() => setAddEditOpen(true)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" color="primary" onClick={() => setDeleteOpen(true)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </TableCell>
        </TableRow>
        <AddEditContact add={false} contact={contactsRow} open={addEditOpen} setOpen={setAddEditOpen} />
      <DeleteItem isMeeting={false} contact={contactsRow} open={deleteOpen} setOpen={setDeleteOpen}/>
      </React.Fragment>
    );
}

export default ContactsTableRow;