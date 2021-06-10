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

interface ContactsTableRowProps {
    contactsRow: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: "86%",
      margin: "30px 7%",
      height: "100%",
    },
  }));

const ContactsTableRow: React.FC<ContactsTableRowProps> = ({ contactsRow }) => {
    const { firstName, lastName, phoneNumber } = contactsRow;
    const classes = useStyles();
    return (
      <React.Fragment>
        <TableRow>
          <TableCell align="center">{firstName}</TableCell>
          <TableCell align="center">{lastName}</TableCell>
          <TableCell align="center">{phoneNumber}</TableCell>
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