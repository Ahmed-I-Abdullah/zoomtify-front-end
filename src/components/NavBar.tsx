import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";
import Logo from "../assets/logo.svg";
import { theme } from "../theme/theme";

interface NavBarProps {
  showLogIn: boolean;
}

const useStyles = makeStyles({
  navRoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-between",
    alignContent: "center",
    cursor: "pointer",
    textDecoration: "none",
    width: "fit-content",
    transition: "all 150ms ease",
  },
  buttonsDiv: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  navTitle: {
    color: theme.palette.text.primary,
    marginLeft: "20px",
  },
  navButton: {
    margin: "0px 20px",
    height: "50px",
  },
});
const NavBar: React.FC<NavBarProps> = ({ showLogIn }) => {
  const classes = useStyles();
  return (
    <div className={classes.navRoot}>
      <div style={{ width: "20%" }}>
        <Link className={classes.linkDiv} to="/">
          <img src={Logo} style={{ height: "55px" }} alt="Logo" />
          <h1 className={classes.navTitle}>Zoomtify</h1>
        </Link>
      </div>
      <div className={classes.buttonsDiv}>
        <Button className={classes.navButton} color="secondary">
          Home
        </Button>
        <Button className={classes.navButton} color="secondary">
          About
        </Button>
        <Button
          className={classes.navButton}
          variant="outlined"
          color="secondary"
        >
        {showLogIn ? "Log In" : "Sign Out"}
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
