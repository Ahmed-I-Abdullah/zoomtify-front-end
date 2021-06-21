import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
} from "@material-ui/core";
import Contact from "../models/Contact";
import MuiPhoneNumber from "material-ui-phone-number";
import ZoomtifyContext from "../contexts/ZoomtifyContext";
import Token from "../models/Token";
import jwt_decode from "jwt-decode";
import clientInstance from "../httpClient";

interface AddEditContactProps {
  add: boolean;
  contact?: Contact;
  open: boolean;
  setOpen: Function;
}

const useStyles = makeStyles({
  error: {
    color: "#ff0000",
  },
});

const AddEditContact: React.FC<AddEditContactProps> = ({
  add,
  contact,
  open,
  setOpen,
}) => {
  const classes = useStyles();
  const { contacts, setContacts, fetchContacts } = useContext(ZoomtifyContext);
  const [firstName, setFirstName] = useState(contact?.first_name || "");
  const [lastName, setLastName] = useState(contact?.last_name || "");
  const [phoneNumber, setPhoneNumber] = useState(contact?.phone_number || "");
  const [errors, setErrors] = useState({
    firstName: "",
    phoneNumber: "",
  });

  const decodedToken: Token = jwt_decode(localStorage.getItem("access") || "");
  const resetErrors = () => setErrors({ firstName: "", phoneNumber: "" });
  const resetData = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };

  const handleCancel = () => {
    setOpen(false);
    resetData();
    resetErrors();
  };

  const validateData = () => {
    resetErrors();
    let isValid = true;
    if (!firstName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "Contact Must have a first name.",
      }));
      isValid = false;
    }
    if (!phoneNumber) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Contact must have a valid phone number.",
      }));
      isValid = false;
    }
    return isValid;
  };

  const handleCreatContact = () => {
    if (!validateData()) return;
    const newContact = {
      associated_user: decodedToken.user_id,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };
    console.log("new contact is: ", newContact);
    clientInstance
      .post("contacts", newContact)
      .then((resp) => {
        console.log("created contact, with response: ", resp);
        resetErrors();
        setContacts(contacts ? [...contacts, resp.data] : [resp.data]);
        setOpen(false);
        resetData();
      })
      .catch((err) => console.log("error creating contact: ", err));
  };

  const handleUpdateContact = () => {
    if (!validateData() || !contact) return;
    const updatedContact = {
      associated_user: contact.associated_user,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };
    clientInstance
      .put(`contacts/` + contact.id + "/", updatedContact)
      .then((resp) => {
        console.log("updated contact, with response: ", resp);
        resetErrors();
        fetchContacts();
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{add ? "Add Contact" : "Edit Contact"}</DialogTitle>
      <DialogContent>
        <Grid container direction="row">
          <Grid item container>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className={classes.error}>{errors.firstName}</div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
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
              <div className={classes.error}>{errors.phoneNumber}</div>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
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
