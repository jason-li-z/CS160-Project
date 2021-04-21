import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';

/*Styles*/
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
  root: {
    background: 'background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,74,1) 0%, rgba(0,212,255,1) 100%)',
  },
}));

/*Displays the user profile information */
function Profile() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [profileInfo, setProfileInfo] = useState({
    username: [],
    firstName: [],
    lastName: [],
  });

  useEffect(() => {
    const getData = async () => {
      let result = await fetch('http://localhost:5000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });
      let data = await result.json();
      //Set the variable data
      if (data.status === 200) {
        setProfileInfo(data.data);
      } else {
        setIsLoggedIn(false);
      }
    };
    getData();
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <div>
      <Paper
        elevation={12}
        style={{
          padding: 40,
          width: 380,
          height: 'auto',
          margin: '20px auto',
          borderRadius: '20px',
        }}
      >
        {/*Displays the profile name and a face icon*/}
        <Container className={classes.container} style={{ padding: 10 }}>
          <Typography variant="h5" style={{ paddingRight: 15 }}>
            {profileInfo.firstName}'s Profile Page
          </Typography>
        </Container>
        <Container className={classes.container} style={{ padding: 10 }}>
          <Avatar className={classes.large} style={{ backgroundColor: '#3B3235' }}>
            <FaceIcon className={classes.large}></FaceIcon>
          </Avatar>
        </Container>

        {/*Displays the username and name  QUERY USING MONGOOSE*/}
        <Typography variant="h6" style={{ paddingRight: 15 }}>
          Username: {profileInfo.username}
        </Typography>
        <Typography variant="h6" style={{ paddingRight: 15, paddingTop: 40, paddingBottom: 40 }}>
          Name: {profileInfo.firstName} {profileInfo.lastName}
        </Typography>

        {/*Display Username*/}
        <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          {' '}
          <Button variant="contained" color="primary" style={{ paddingRight: 15, marginLeft: 120 }}>
            Back to Main
          </Button>
        </Link>
      </Paper>
    </div>
  );
}

export default Profile;
