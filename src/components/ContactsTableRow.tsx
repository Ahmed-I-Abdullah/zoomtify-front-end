import React from "react";
import {
  Grid,
  makeStyles,
  TableCell,
  IconButton,
  TableRow,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Contact from '../models/Contact';

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
    return (
      <React.Fragment>
        <TableRow>
          <TableCell align="center">{first_name}</TableCell>
          <TableCell align="center">{last_name}</TableCell>
          <TableCell align="center">{phone_number}</TableCell>
          <TableCell align="center">
            <Grid container direction="row" justify="center">
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
      </React.Fragment>
    );
}

export default ContactsTableRow;