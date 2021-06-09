import React, { useState } from "react";
import {Grid, Box, makeStyles, TableCell, TableRow, Typography, Collapse, IconButton } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { MeetingStatus } from "../models/Enums";

interface MeetingsTableRowProps {
  tableRow: {
    meetingName: string;
    startTime: Date;
    URL: string;
    message: string;
    status: MeetingStatus;
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "86%",
    margin: "30px 7%",
    height: "100%",
  },
}));

const MeetingsTableRow: React.FC<MeetingsTableRowProps> = ({ tableRow }) => {
  const { meetingName, startTime, URL, message, status } = tableRow;
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
        <TableCell align="center">{URL}</TableCell>
        <TableCell align="center">{message}</TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">
          <Grid container direction="column">
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
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Contacts To Notify
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default MeetingsTableRow;
