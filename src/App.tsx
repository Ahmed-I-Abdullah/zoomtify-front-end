import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import Landing from "./pages/Landing";
import Meetings from "./pages/Meetings";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { theme } from "./theme/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Meetings />
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
