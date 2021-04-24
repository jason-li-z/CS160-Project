import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Profile from './pages/Profile';
import UserMain from './pages/UserMain';
import Questions from './pages/Questions';

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
          <Route path="/#inline" component={Home}/>
          <Route path="/#about" component={Home}/>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/userMain" component={UserMain} />
          <Route path="/questions" component={Questions} />
          {/*<Route path="/profile" component={Profile} />*/}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
