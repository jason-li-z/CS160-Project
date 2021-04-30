import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import { InputLabel, MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Userquestion() {
  const history = useHistory();
  const [username, setUsername] = useState('');
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
        setUsername(data.data.username);
        console.log(data.data.username);
      } else {
        console.log('NOt');
      }
    };
    getData();
  }, []);

  const [q1, setOne] = useState('A');
  const handleChangeOne = (event) => {
    setOne(event.target.value);
  };
  const [q2, setMentalstate] = useState('1');
  const handleChangeMentalState = (event) => {
    setMentalstate(event.target.value);
  };
  const [q3, setProductivtyRate] = useState('1');
  const handleChangeProductivityRate = (event) => {
    setProductivtyRate(event.target.value);
  };
  const [q4, setFour] = useState('No');
  const handleChangeFour = (event) => {
    setFour(event.target.value);
  };
  const [q5, setFive] = useState('1');
  const handleChangeFive = (event) => {
    setFive(event.target.value);
  };
  const [q6, setSix] = useState('1');
  const handleChangeSix = (event) => {
    setSix(event.target.value);
  };
  const [q7, setSeven] = useState('No');
  const handleChangeSeven = (event) => {
    setSeven(event.target.value);
  };
  const [q8, setEight] = useState('No');
  const handleChangeEight = (event) => {
    setEight(event.target.value);
  };
  const [q9, setNine] = useState('No');
  const handleChangeNine = (event) => {
    setNine(event.target.value);
  };
  const [q10, setTen] = useState('No');
  const handleChangeTen = (event) => {
    setTen(event.target.value);
  };

  const handleOnClick = async () => {
    let result = await fetch('http://localhost:5000/userquestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        questionArray: [
          {
            q1: q1,
            q2: parseInt(q2),
            q3: parseInt(q3),
            q4: q4 === 'Yes' ? true : false,
            q5: parseInt(q5),
            q6: parseInt(q6),
            q7: q7 === 'Yes' ? true : false,
            q8: q8 === 'Yes' ? true : false,
            q9: q9 === 'Yes' ? true : false,
            q10: q10 === 'Yes' ? true : false,
          },
        ],
      }),
    });
    //  console.log("Submitted");
    let data = await result.json();
    if (data.status === 200) {
      history.push('/data');
    }
  };

  const classes = useStyles();

  return (
    <Zoom in={true} timeout={1000}>
      <div>
        <Paper
          elevation={12}
          style={{
            padding: 40,
            width: 1080,
            height: 'auto',
            margin: '20px auto',
          }}
        >
          <Container className={classes.container}>
            <Typography variant="h5" style={{ paddingRight: 20 }}>
              Daily Questions
            </Typography>
          </Container>
          <Container className={classes.container} style={{ padding: 20 }}>
            <InputLabel id="label">1. How would you describe your overall mood?</InputLabel>
          </Container>
          <Container className={classes.container} style={{ padding: 20 }}>
            <Select labelId="label" id="select" value={q1} onChange={handleChangeOne}>
              <MenuItem value="A">Life has nothing short of amazing</MenuItem>
              <MenuItem value="B">Life has been treating me well</MenuItem>
              <MenuItem value="C">Got a bit of good and bad here and there</MenuItem>
              <MenuItem value="D">I’m feeling down</MenuItem>
              <MenuItem value="E">Life has hit rock bottom</MenuItem>
            </Select>
          </Container>
          {/*Question 2*/}
          <Container className={classes.container} style={{ padding: 20 }}>
            <InputLabel id="label">
              2. On a scale of 1-10 how would you rank your mental state? With 1 being the worst in your lifetime and 10
              being the best in your lifetime.
            </InputLabel>
          </Container>
          <Container className={classes.container} style={{ padding: 20 }}>
            <Select labelId="label" id="select" value={q2} onChange={handleChangeMentalState}>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="10">10</MenuItem>
            </Select>
          </Container>
          {/*Question 3*/}
          <Container className={classes.container} style={{ padding: 20 }}>
            <InputLabel id="label">
              3. How would you rate your overall progress/productivity for your day’s goals?
            </InputLabel>
          </Container>
          <Container className={classes.container} style={{ padding: 20 }}>
            <Select labelId="label" id="select" value={q3} onChange={handleChangeProductivityRate}>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="10">10</MenuItem>
            </Select>
          </Container>
          {/*Question 4*/}
          <Container className={classes.container} style={{ padding: 20 }}>
            <InputLabel id="label">4. If you are feeling down, do you need mental help/support?</InputLabel>
          </Container>
          <Container className={classes.container} style={{ padding: 20 }}>
            <Select labelId="label" id="select" value={q4} onChange={handleChangeFour}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </Container>
          {/*Question 5*/}
          <Container className={classes.container} style={{ padding: 20 }}>
            <InputLabel id="label">5. How many goals did you plan to achieve today?</InputLabel>
          </Container>
          <Container className={classes.container} style={{ padding: 20 }}>
            <Select labelId="label" id="select" value={q5} onChange={handleChangeFive}>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="10">10</MenuItem>
            </Select>
          </Container>
          {/*Question 6*/}
          <Container className={classes.container} style={{ padding: 20 }}>
            <InputLabel id="label">6. How many goals did you achieve by the end of the day?</InputLabel>
          </Container>
          <Container className={classes.container} style={{ padding: 20 }}>
            <Select labelId="label" id="select" value={q6} onChange={handleChangeSix}>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="10">10</MenuItem>
            </Select>
          </Container>
          {/*Question 7*/}
          <Container className={classes.container} style={{ padding: 20 }}>
            <InputLabel id="label">7. Are you happy with the amount of work/progress/goals you have completed?</InputLabel>
          </Container>
          <Container className={classes.container} style={{ padding: 20 }}>
            <Select labelId="label" id="select" value={q7} onChange={handleChangeSeven}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </Container>
          {/*Question 8*/}
          <Container className={classes.container} style={{ padding: 20 }}>
            <InputLabel id="label">8. Did anything happen that interrupted you from completing your day’s goals?</InputLabel>
          </Container>
          <Container className={classes.container} style={{ padding: 20 }}>
            <Select labelId="label" id="select" value={q8} onChange={handleChangeEight}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </Container>
          {/*Question 9*/}
          <Container className={classes.container} style={{ padding: 20 }}>
            <InputLabel id="label">9. Did your mood decrease your motivation to finish your day’s tasks?</InputLabel>
          </Container>
          <Container className={classes.container} style={{ padding: 20 }}>
            <Select labelId="label" id="select" value={q9} onChange={handleChangeNine}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </Container>
          {/*Question 10*/}
          <Container className={classes.container} style={{ padding: 20 }}>
            <InputLabel id="label">10. Were you able to finish all of your most important tasks (starred)?</InputLabel>
          </Container>
          <Container className={classes.container} style={{ padding: 20 }}>
            <Select labelId="label" id="select" value={q10} onChange={handleChangeTen}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </Container>

          <Container className={classes.container} style={{ marginTop: 25, padding: 30 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleOnClick}
              className={classes.buttonStyle}
            >
              Submit
            </Button>
          </Container>
        </Paper>
      </div>
    </Zoom>
  );
}

export default Userquestion;
