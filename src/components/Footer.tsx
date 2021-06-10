import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    backgroundColor: "#1A1A1D",
    minHeight: "7em",
    width: "100%",
    position: "relative",
    bottom: "0",
    textAlign: "center",
  },
  contactInfo: {
    display: "inline-block",
    width: "200px",
    margin: "30px auto",
  },
  contactIcon: {
    width: "50px",
    height: "50px",
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerContainer}>
      <div className={classes.contactInfo}>
        <IconButton aria-label="github">
          <GitHubIcon className={classes.contactIcon} />
        </IconButton>
        <IconButton aria-label="linkedin">
          <LinkedInIcon className={classes.contactIcon} />
        </IconButton>
      </div>
    </div>
  );
};

export default Footer;