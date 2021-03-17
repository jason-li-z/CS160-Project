import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Register() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const [firstNameErrorText, setFirstNameErrorText] = useState('');
  const [lastNameErrorText, setLastNameErrorText] = useState('');
  const [usernameErrorText, setUsernameErrorText] = useState('');

  const handleFirstNameOnChange = (event) => {
    let user = event.target.value;
    let regex = new RegExp('^[a-zA-Z]*$'); // Nonalphanumeric regex
    let value = regex.exec(user);
    if (value === null) {
      // Handle error
      setFirstNameError(true);
      setFirstNameErrorText('Please type in A-Z characters only');
      setUsername('');
    } else {
      setFirstNameError(false);
      setFirstNameErrorText('');
      setFirstName(value.input);
    }
  };

  const handleLastNameOnChange = (event) => {
    let user = event.target.value;
    let regex = new RegExp('^[a-zA-Z]*$'); // Nonalphanumeric regex
    let value = regex.exec(user);
    if (value === null) {
      // Handle error
      setLastNameError(true);
      setLastNameErrorText('Please type in A-Z characters only');
      setUsername('');
    } else {
      setLastNameError(false);
      setLastNameErrorText('');
      setLastName(value.input);
    }
  };

  const handleUsernameOnChange = (event) => {
    let user = event.target.value;
    let regex = new RegExp('^[a-zA-Z0-9_]*$'); // Nonalphanumeric regex
    let value = regex.exec(user);
    if (value === null) {
      // Handle error
      setUsernameError(true);
      setUsernameErrorText('Please use alphanumeric characters only');
      setUsername('');
    } else {
      setUsernameError(false);
      setUsernameErrorText('');
      setUsername(value.input);
    }
  };

  const handleOnClick = () => {
    if (username === '' || firstName === '' || lastName === '') {
      // Validation
      if (username === '') {
        setUsernameError(true);
        setUsernameErrorText('Please double check your username');
      }
      if (firstName === '') {
        setFirstNameError(true);
        setFirstNameErrorText('Please double check first name');
      }
      if (lastName === '') {
        setLastNameError(true);
        setLastNameErrorText('Please double check last name');
      }
    } else {
      // Send POST request to backend
      setFirstNameErrorText('');
      setLastNameErrorText('');
      setUsernameErrorText('');
      setLastNameError(false);
      setFirstNameError(false);
      setUsernameError(false);
      console.log(
        `First Name:${firstName}, Last Name: ${lastName}, Username: ${username}`
      );
    }
  };

  return (
    <div className>
      <Paper
        elevation={12}
        style={{
          padding: 40,
          width: 380,
          height: 'auto',
          margin: '20px auto',
        }}
      >
        <Container className={classes.container} style={{ padding: 10 }}>
          <Typography variant="h5" style={{ paddingRight: 15 }}>
            Register an Account
          </Typography>
          <Avatar style={{ backgroundColor: '#2A3035' }}>
            <FaceIcon></FaceIcon>
          </Avatar>
        </Container>
        <Container className={classes.container} style={{ paddingBottom: 15 }}>
          <TextField
            error={firstNameError}
            helperText={firstNameErrorText}
            label="First Name"
            onChange={handleFirstNameOnChange}
          ></TextField>
        </Container>
        <Container className={classes.container} style={{ paddingBottom: 15 }}>
          <TextField
            error={lastNameError}
            helperText={lastNameErrorText}
            label="Last Name"
            onChange={handleLastNameOnChange}
          ></TextField>
        </Container>
        <Container className={classes.container}>
          <TextField
            error={usernameError}
            helperText={usernameErrorText}
            label="Username"
            onChange={handleUsernameOnChange}
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
          >
            Register
          </Button>
        </Container>
      </Paper>
    </div>
  );
}

export default Register;
