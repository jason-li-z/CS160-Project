import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Profile from './pages/Profile';
import UserMain from './pages/UserMain';
import Data from './pages/Data';
import Userquestion from './components/Userquestions';
import Graph from './pages/Graph';
import React, { useState, useEffect } from 'react';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins'].join(','),
  },

  palette: {
    type: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/userMain" component={UserMain} />
          <Route path="/data" component={Data} />
          <Route path="/userQuestion" component={Userquestion} />
          <Route path="/graph" component={Graph} />

          {/*<Route path="/profile" component={Profile} />*/}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
