import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import Landing from './pages/Landing';
import { theme } from './theme/theme';
import { Meetings } from './pages/Meetings';

function App() {
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
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
