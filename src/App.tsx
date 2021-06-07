import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import Landing from './pages/Landing';
import { theme } from './theme/theme';
 
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
