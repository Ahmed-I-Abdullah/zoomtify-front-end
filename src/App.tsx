import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import Landing from "./pages/Landing";
import Meetings from "./pages/Meetings";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { theme } from "./theme/theme";

const App = () => {
  const [meetings, setMeetings] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL + "meetings";
    console.log("the url: ", apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMeetings(data);
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Meetings meetings={meetings} loading={loading} />
          </Route>
          <Route exact path="/landing">
            <Landing />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
export default App;
