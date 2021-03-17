import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleUserOnChange = (event) => {
    let user = event.target.value;
    let regex = new RegExp('^[a-zA-Z0-9_]*$'); // Nonalphanumeric regex
    let alphanumericValue = regex.exec(user);
    if (alphanumericValue === null) {
      // Handle error
      setError(true);
      setErrorText('Please use alphanumeric values only');
      setUsername('');
    } else {
      setError(false);
      setErrorText('');
      setUsername(alphanumericValue.input);
    }
  };

  const handlePasswordOnChange = (event) => {
    let pw = event.target.value;
    if (pw !== '') {
      setPassword(pw);
    } else {
      setPassword('');
    }
  };

  const handleOnClick = async () => {
    if (username === '' || password === '') {
      // Validation
      setError(true);
      setErrorText('Please check your login information');
    } else {
      // Send POST request to backend
      setError(false);
      setErrorText('');
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      }).then((response) => {
        if (response.status === 200) {
          console.log('Success!');
        }
      });
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Paper
        elevation={12}
        style={{
          padding: 40,
          width: 380,
          height: 'auto',
          margin: '20px auto',
        }}
      >
        <Container className={classes.container}>
          <Typography variant="h5" style={{ paddingRight: 20 }}>
            User Login
          </Typography>
          <Avatar style={{ backgroundColor: '#2A3035' }}>
            <LockIcon></LockIcon>
          </Avatar>
        </Container>
        <Container className={classes.container} style={{ padding: 20 }}>
          <TextField
            error={error}
            helperText={errorText}
            label="Username"
            onChange={handleUserOnChange}
          ></TextField>
        </Container>
        <Container className={classes.container}>
          <TextField
            label="Password"
            type="password"
            onChange={handlePasswordOnChange}
          ></TextField>
        </Container>
        <Container
          className={classes.container}
          style={{ marginTop: 25, padding: 30 }}
        >
          <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            {' '}
            <Button color="primary" style={{ marginRight: 75 }}>
              Back Home
            </Button>
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleOnClick}
            className={classes.buttonStyle}
          >
            Login
          </Button>
        </Container>
      </Paper>
    </div>
  );
}

export default Login;
