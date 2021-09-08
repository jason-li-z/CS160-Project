import React, { useState, useEffect } from 'react';
import NavbarUser from '../components/NavbarUser';
import Fade from '@material-ui/core/Fade';
import Userquestion from '../components/Userquestions';
import { Redirect } from 'react-router-dom';
import smile from './smile.jpg';
import flower from './flowerpot.jpg';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import DataColumn from '../components/DataColumn';
import styles from './Data.module.css';

function UserMain() {

  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [valid, setIsValid] = useState(false);
  const [weeklyProgress, setWeeklyProgress] = useState(0.0);
  const [dataInfo, setDataInfo] = useState([]);
  const [help, setHelp] = useState(false);
  const [open, setOpen] = useState(false);
  const [mental, setMental] = useState(false);
  const [day, onChange] = useState(new Date());
  const [taskArray, setTaskArray] = useState([]);
  const [calDay, setCalDay] = useState('');

  useEffect(() => {
    // Check if token has expired
    const validate = async () => {
      let result = await fetch('http://localhost:5000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });
      let data = await result.json();
      if (data.status !== 200) {
        setIsLoggedIn(false);
      }
    };

    const getUserInfo = async () => {
      let result = await fetch('http://localhost:5000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token'),
      date: day }),
      });
      let data = await result.json();
      if (data.status === 200) {
        setDataInfo(data.data.questionArray);
        getProgress();
        getHelp();
        getMental();
        let current = new Date(data.data.questionArray[data.data.questionArray.length - 1].date);
        let next = new Date(current);
        next.setHours(24, 0, 0, 0);
        let today = new Date();
        if (today >= next) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } else if (data.status === 404) {
        setIsValid(true);
      }
    };

    const getProgress = () => {
      let prog = 0.0;
      let totalGoal = 0.0;
      let totalProg = 0.0;
      if(dataInfo.length >= 7) {
        let currentWeek = dataInfo.splice(dataInfo.length - 7);
        currentWeek.forEach((element) => {
          totalGoal += element.q5;
          totalProg += element.q6;
        });
        totalGoal = totalGoal / 7;
        totalProg = totalProg / 7;
      }
      else {
        dataInfo.forEach((element) => {
          totalGoal += element.q5;
          totalProg += element.q6;
        });
        totalGoal = totalGoal / dataInfo.length;
        totalProg = totalProg / dataInfo.length;
      }
      if(totalGoal !== 0) {
        prog = totalProg / totalGoal;
        setWeeklyProgress(prog);
      }
    };

    const getHelp = () => {
      if(dataInfo.length >= 7) {
        let currentWeek = dataInfo.splice(dataInfo.length - 7);
        currentWeek.forEach((element) => {
          if(element.q4) {
            setHelp(true);
          }
        });
      }
      else {
        dataInfo.forEach((element) => {
          if(element.q4) {
            setHelp(true);
          }
        });
      }
      if(help) {
        setOpen(true);
      }
    };

    const getMental = () => {
      if(dataInfo.length >= 7) {
        let currentWeek = dataInfo.splice(dataInfo.length - 7);
        currentWeek.forEach((element) => {
          if(element.q2 < 5) {
            setMental(true);
          }
        });
      }
      else {
        dataInfo.forEach((element) => {
          if(element.q2 < 5) {
            setMental(true);
          }
        });
      }
    };
    validate();
    getUserInfo();
    changeDate();
    // let date = new Date(last.date);
    // let nextMidnight = date.setHours(24, 0, 0, 0);
    // console.log(nextMidnight);
  }, [dataInfo]);

  if (!isLoggedIn) {
    return <Redirect to="/"></Redirect>;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    history.push({ pathname: '/task', state: { message: 'Add a task' } });
  };

  const changeDate = async () => {
    setCalDay(day.toString().substring(3, 10) + "," + day.toString().substring(10, 15));
    let result = await fetch('http://localhost:5000/getTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        token: localStorage.getItem('token'),
      }),
    });
    let data = await result.json();
    
    if (data.status === 200) {
      setTaskArray(data.data.taskArray);
    }

  };

  function getarray(array) {
    var rows = [];
    var tableRows = [];
    for (var i = 0; i < array.length; i++) {
      rows.push(array[i]);
    }
    //console.log(array[0].q9);
    // console.log();
    rows.forEach(function (item) {
      var name = item.name;
      var description = item.description;
      if(item.date === day.toISOString().substring(0, 10)) {

        tableRows.push(
          <tr>
            <td> {name} </td>
            <td> {description} </td>
          </tr>
        );
      }
    });
    return tableRows;
  }

  return (
    <Fade in={true} timeout={1000}>
      <div>
          {open ? (
            <Alert severity="info" onClose={handleClose}>During your daily questions, you mentioned 
              that you would like to recieve mental support. Life is challenging, but you don't have 
              to experiece your hardships alone! We want to make it clear that it is okay to recieve 
              help, and we recommend you to go to here to find support groups online: 
              <a href="https://www.mhanational.org/find-support-groups">Find support groups</a>.</Alert>
          ) : (<div></div>)}
        <NavbarUser handleLogout={handleLogout}></NavbarUser>
        {valid ? (
          <Userquestion />
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Fade in={true}>
                <h2>You've already answered recently, please come back tomorrow or at 12AM.</h2>
              </Fade>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar
                onChange={onChange}
                onClickDay={changeDate}
                onClickMonth={changeDate}
                calendarType={"US"}
                value={day} />
              <Container>
                <Button  variant="contained" color="primary" style={{ marginRight: 40 }} onClick={onClick}>Add a task</Button>
                <table border="1" bordercolor="blue" width="100%">
                  <td colSpan="11" align="center">
                    <h3>
                      <b>Tasks for: {calDay}</b>
                    </h3>{' '}
                  </td>
                  <tr>
                    <td> Name </td>
                    <td> Description </td>
                  </tr>
                  {getarray(taskArray)}
                </table>
              </Container>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
              <h2>Feedback</h2>
            </div>
            {weeklyProgress < 0.5 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                <p>Unfortunately, you weren't able to complete much of your goals last week, but don't give up! As long as you keep trying,
                  it isn't the end. This is only the start; your greatness awaits!</p>
              </div>
            ) : (<div></div>)}
            {weeklyProgress === 1.0 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <p>You are super hard working! Congratulations on completing all of your goals last week; you deserve a pat on the back.
                  Thank you for doing your best. Cheers to many more weeks of supremacy!</p>
              </div>
            ) : (
              <div>
                {weeklyProgress > 0.5 ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                    <p>Great work! You were able to complete most of your goals last week. Thank you for being productive 
                      and keep up the great work. You are on your way towards being unstoppable!</p>
                  </div>
                ) : (<div></div>)}
              </div>
            )}
            {mental ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <p>Previously, you rated your mental state quite low. We wanted to emphasize that while productivity is an 
                important factor, mental health cannot be overlooked. Please, take care of yourself.</p>
            </div>
            ) : (<div></div>)}
            {help ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                <p>In a previous questionnaire, you indicated that you would like to recieve some mental support. We just 
                  wanted to let you know that you are strong for reaching out, and that we believe in you.</p>
              </div>
            ) : (<div></div>)}
            {weeklyProgress > 0.5 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh'}} >
                <img src={smile} alt='smileyface'/>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh'}} >
                <img src={flower} alt='thebeginning'/>
              </div>
            )}
          </div>
        )}
      </div>
    </Fade>
  );
}

export default UserMain;
