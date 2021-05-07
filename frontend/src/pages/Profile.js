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
  const [dataInfo, setDataInfo] = useState([]);
  const [averageMental, setAverageMental] = useState(0.0);
  const [averageProgress, setAverageProgress] = useState(0.0);
  const [averageGoalsPlanned, setAverageGoalsPlanned] = useState(0.0);
  const [averageGoalsAchieved, setAverageGoalsAchieved] = useState(0.0);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString('en-US');
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();
    return `${month + 1}/${day}/${year}`;
  };

  useEffect(() => {
    setLoading(true);
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
        console.log(data.data);
        setProfileInfo(data.data);
      } else {
        setIsLoggedIn(false);
      }

      result = await fetch('http://localhost:5000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });
      data = await result.json();
      //Set the variable data
      if (data.status === 200) {
        setDataInfo(data.data.questionArray);
        // Calculate average
        if (data.data.questionArray.length >= 7) {
          // console.log(data.data.questionArray);
          let currentWeek = data.data.questionArray.splice(data.data.questionArray.length - 7);
          let totalQ2 = 0.0;
          let totalQ3 = 0.0;
          let totalQ5 = 0.0;
          let totalQ6 = 0.0;
          currentWeek.forEach((element) => {
            totalQ2 += element.q2;
            totalQ3 += element.q3;
            totalQ5 += element.q5;
            totalQ6 += element.q6;
          });
          setAverageMental((totalQ2 / 7).toFixed(3));
          setAverageProgress((totalQ3 / 7).toFixed(3));
          setAverageGoalsPlanned((totalQ5 / 7).toFixed(3));
          setAverageGoalsAchieved((totalQ6 / 7).toFixed(3));
          let start = formatDate(currentWeek[0].date);
          let end = formatDate(currentWeek[6].date);
          setStartDate(start);
          setEndDate(end);
        } else {
          let start = formatDate(data.data.questionArray[0].date);
          let end = formatDate(data.data.questionArray[data.data.questionArray.length - 1].date);
          setStartDate(start);
          setEndDate(end);
          let totalQ2 = 0.0;
          let totalQ3 = 0.0;
          let totalQ5 = 0.0;
          let totalQ6 = 0.0;
          data.data.questionArray.forEach((element) => {
            totalQ2 += element.q2;
            totalQ3 += element.q3;
            totalQ5 += element.q5;
            totalQ6 += element.q6;
          });
          setAverageMental((totalQ2 / data.data.questionArray.length).toFixed(3));
          setAverageProgress((totalQ3 / data.data.questionArray.length).toFixed(3));
          setAverageGoalsPlanned((totalQ5 / data.data.questionArray.length).toFixed(3));
          setAverageGoalsAchieved((totalQ6 / data.data.questionArray.length).toFixed(3));
        }
      }
    };
    getData();
    setLoading(false);
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/"></Redirect>;
  }

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <Paper
        elevation={12}
        style={{
          padding: 40,
          width: 800,
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
        <Typography variant="h6" style={{ padding: 15 }}>
          Username: {profileInfo.username}
        </Typography>

        <Typography variant="h6" style={{ padding: 15 }}>
          Average mental state ({startDate} - {endDate}): {averageMental} / 10
        </Typography>
        <Typography variant="h6" style={{ padding: 15 }}>
          Average overall progress ({startDate} - {endDate}): {averageProgress} / 10
        </Typography>

        <Typography variant="h6" style={{ padding: 15 }}>
          Average goals planned ({startDate} - {endDate}): {averageGoalsPlanned} / 10
        </Typography>

        <Typography variant="h6" style={{ padding: 15 }}>
          Average goals actually achieved ({startDate} - {endDate}): {averageGoalsAchieved} / 10
        </Typography>

        {/*Display Username*/}
        <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          {' '}
          <Button variant="contained" color="primary" style={{ paddingRight: 15, marginLeft: 330 }}>
            Back to Main
          </Button>
        </Link>
      </Paper>
    </div>
  );
}

export default Profile;
