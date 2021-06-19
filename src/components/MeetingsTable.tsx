import React, { useState } from "react";
import MeetingsTableRow from "./MeetingsTableRow";
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
import { MeetingStatus } from "../models/Enums";
import Meeting from "../models/Meeting";
import Contact from "../models/Contact";

interface ContactsArray extends Array<Contact> {}
interface MeetingsArray extends Array<Meeting> {}

interface MeetingsTableProps {
  meetings: MeetingsArray | null;
  contacts: ContactsArray | null;
  loading: boolean;
}

const useStyles = makeStyles((theme) => ({
  meetingsTableRoot: {
    width: "86%",
    margin: "0px 7%",
  },
  meetingsTableContainer: {
    border: "3px solid #E0E0E0",
    boxShadow: "0px 4px 4px #C4C4C4",
    borderRadius: "30px",
    minWidth: "0px",
    margin: "25px 0px",
    backgroundColor: '#ffffff',
  },
}));

const MeetingsTable: React.FC<MeetingsTableProps> = ({ meetings, loading, contacts }) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState(""); // to use for search bar
  return (
    <div className={classes.meetingsTableRoot}>
      <fieldset className={classes.meetingsTableContainer}>
        <Grid container style={{ padding: "0px 3%" }}>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            justify="space-between"
            style={{ margin: "20px 1%" }}
          >
            <Grid item xs={12}>
            <h1 style={{marginBottom: '20px'}}>My Meetings</h1>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="search"
                variant="outlined"
                margin="dense"
                label="Search Meetings"
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
                Add Meeting
              </Button>
            </Grid>
          </Grid>
          <Grid item container justify="flex-end" xs={12}>
            <TableContainer style={{ overflowY: "scroll", height: "calc(100vh - 300px)" }}>
              <Table aria-label="meetings table">
                <TableHead>
                  <TableRow>
                    <TableCell>Expand Contacts</TableCell>
                    <TableCell align="center">Meeting Name</TableCell>
                    <TableCell align="center">Start Time</TableCell>
                    <TableCell align="center">Url</TableCell>
                    <TableCell align="center">Message</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {meetings?.map((meeting, index) => (
                    <MeetingsTableRow key={index} tableRow={meeting} contacts={contacts} />
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

export default MeetingsTable;
