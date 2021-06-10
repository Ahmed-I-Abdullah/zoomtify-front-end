import React, { useState } from "react";
import ContactsTableRow from "./ContactsTableRow";
import {
  Grid,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  makeStyles,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

interface ContactsTableProps {}

const contacts = [
  {
    firstName: "Omar",
    lastName: "Ibrahim",
    phoneNumber: "+1-613-555-0114",
  },
  {
    firstName: "Mohammed",
    lastName: "al",
    phoneNumber: "+1-613-555-0123",
  },
  {
    firstName: "Test",
    lastName: "Contact",
    phoneNumber: "+1-613-555-0138",
  },
  {
    firstName: "Youssef",
    lastName: "Random",
    phoneNumber: "+1-613-555-0111",
  },
  {
    firstName: "Ahmed",
    lastName: "Abdullah",
    phoneNumber: "+1-613-555-0105",
  },
  {
    firstName: "Jack",
    lastName: "son",
    phoneNumber: "+1-613-555-0146",
  },
];

const useStyles = makeStyles((theme) => ({
  contactsTableRoot: {
    width: "86%",
    margin: "0px 7%",
  },
  contactsTableContainer: {
    border: "3px solid #E0E0E0",
    boxShadow: "0px 4px 4px #C4C4C4",
    borderRadius: "30px",
    minWidth: "0px",
    margin: "125px 0px",
  },
}));

const ContactsTable: React.FC<ContactsTableProps> = ({}) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState(""); // to use for search bar
  return (
    <div className={classes.contactsTableRoot}>
      <fieldset className={classes.contactsTableContainer}>
        <legend style={{ marginLeft: "4%", fontSize: 40 }}>My Contacts</legend>
        <Grid container style={{ padding: "0px 3%" }}>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            justify="space-between"
            style={{ margin: "20px 1%" }}
          >
            <Grid item xs={6}>
              <TextField
                type="search"
                variant="outlined"
                margin="dense"
                label="Search Contacts"
                value={searchText}
                style={{ width: "100%" }}
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container item xs={6} justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {}}
              >
                Add Contact
              </Button>
            </Grid>
          </Grid>
          <Grid item container justify="flex-end" xs={12}>
            <TableContainer style={{ overflowY: "scroll", height: "calc(100vh - 200px)" }}>
              <Table aria-label="contacts table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">First Name</TableCell>
                    <TableCell align="center">Last Name</TableCell>
                    <TableCell align="center">Phone Number</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts.map((contact) => (
                    <ContactsTableRow contactsRow={contact} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </fieldset>
    </div>
  );
};

export default ContactsTable;
