import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import Landing from "./pages/Landing";
import Meetings from "./pages/Meetings";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { theme } from "./theme/theme";
import { ZoomtifyProvider } from "./contexts/ZoomtifyContext";

const App = () => {
  return (
    <ZoomtifyProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/main">
              <Meetings />
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
    </ZoomtifyProvider>
  );
};
export default App;
