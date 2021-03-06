import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Button, useMediaQuery } from "@material-ui/core";
import Logo from "../assets/logo.svg";
import clientInstance from "../httpClient";
import { useHistory } from "react-router";
import { Link as ScrollLink } from "react-scroll";

interface NavBarProps {
  showLogIn: boolean;
}

const useStyles = makeStyles({
  navContainer: {
    width: "100%",
    backgroundColor: "#1A1A1D",
    height: "100px",
  },
  navRoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    width: "86%",
    margin: "0px 7%",
    alignItems: "center",
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
    color: "#ffffff",
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
  const history = useHistory();
  const isExtraSmall = useMediaQuery('(max-width:700px)');
  const logout = () => {
    clientInstance
      .post("users/blacklist/", {
        refresh: localStorage.getItem("refresh"),
      })
      .then(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        clientInstance.defaults.headers["Authorization"] = null;
        history.push("/");
      })
      .catch((err) => console.log("error logging out user: ", err));
  };
  return (
    <div className={classes.navContainer}>
      <div className={classes.navRoot}>
        <div style={{ width: "20%" }}>
          <Link className={classes.linkDiv} to="/">
            <img src={Logo} style={{ height: "47px" }} alt="Logo" />
            <h1 className={classes.navTitle}>Zoomtify</h1>
          </Link>
        </div>
        <div className={classes.buttonsDiv}>
          {showLogIn && !isExtraSmall ? (
            <React.Fragment>
              <Button className={classes.navButton} color="secondary">
                Home
              </Button>
              <ScrollLink
                to="about"
                smooth
                duration={1000}
              >
                <Button className={classes.navButton} color="secondary">
                  About
                </Button>
              </ScrollLink>
            </React.Fragment>
          ) : null}
          <Button
            className={classes.navButton}
            variant="outlined"
            color="secondary"
            onClick={showLogIn ? () => history.push("/login") : logout}
          >
            {showLogIn ? "Log In" : "Sign Out"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
