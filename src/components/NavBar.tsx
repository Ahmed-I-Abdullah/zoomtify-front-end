import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";
import Logo from "../assets/logo.svg";

interface NavBarProps {
  showLogIn: boolean;
}

const useStyles = makeStyles({
  navContainer: {
    width: '100%',
    backgroundColor: '#1A1A1D',
    height: '100px',
  },
  navRoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: '100%',
    width: '86%',
    margin: '0px 7%',
    alignItems: 'center',
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
    color: '#ffffff',
    marginLeft: "20px",
    marginTop: "3px",
  },
  navButton: {
    margin: "0px 20px",
    height: "50px",
  },
});

const NavBar: React.FC<NavBarProps> = ({ showLogIn }) => {
  const classes = useStyles();
  return (
    <div className={classes.navContainer}> 
      <div className={classes.navRoot}>
      <div style={{ width: "20%" }}>
        <Link className={classes.linkDiv} to="/landing">
          <img src={Logo} style={{ height: "47px" }} alt="Logo" />
          <h1 className={classes.navTitle}>Zoomtify</h1>
        </Link>
      </div>
      <div className={classes.buttonsDiv}>
        {showLogIn ? (
          <React.Fragment>
            <Button className={classes.navButton} color="secondary">
          Home
        </Button>
        <Button className={classes.navButton} color="secondary">
          About
        </Button>
          </React.Fragment>
        ) : null}
        <Button
          className={classes.navButton}
          variant="outlined"
          color="secondary"
          component={Link}
          to = {showLogIn ? "/login" : ""}
        >
        {showLogIn ? "Log In" : "Sign Out"}
        </Button>
      </div>
    </div>
    </div>
  );
};

export default NavBar;
