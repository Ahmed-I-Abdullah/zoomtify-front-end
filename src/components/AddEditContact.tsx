import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import Contact from "../models/Contact";
import MuiPhoneNumber from "material-ui-phone-number";

interface AddEditContactProps {
  add: boolean;
  contact?: Contact;
  open: boolean;
  setOpen: Function;
}

const AddEditContact: React.FC<AddEditContactProps> = ({ add, contact, open, setOpen }) => {
  const [firstName, setFirstName] = useState(contact?.first_name || '');
  const [lastName, setLastName] = useState(contact?.last_name || '');
  const [phoneNumber, setPhoneNumber] = useState(contact?.phone_number || '');

  const handleCreatContact = () => {};

  const handleUpdateContact = () => {};

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        {add ? "Add Contact" : "Edit Contact"}
      </DialogTitle>
      <DialogContent>
        <Grid container direction="row">
          <Grid item container>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value.trim())}
              />
            </Grid>
            <Grid item xs={6}>
            <TextField autoFocus margin="dense" label="Last Name" value={lastName}
                onChange={(e) => setLastName(e.target.value.trim())} />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={6}>
            <MuiPhoneNumber
                    name="phone"
                    label="Phone Number"
                    data-cy="user-phone"
                    defaultCountry={"ca"}
                    value={phoneNumber}
                    onChange={(val) => setPhoneNumber(val)}
                  />
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
          onClick={add ? handleCreatContact : handleUpdateContact}
          color="primary"
        >
          {add ? "Create" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditContact;
