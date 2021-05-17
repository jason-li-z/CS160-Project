import React, { useState, useEffect } from 'react';
import NavbarUser from '../components/NavbarUser';
import Fade from '@material-ui/core/Fade';
import Userquestion from '../components/Userquestions';
import { Redirect } from 'react-router-dom';
import smile from './smile.jpg';
import flower from './flowerpot.jpg';
import Alert from '@material-ui/lab/Alert';

/* attribution for images:  
https://pixabay.com/photos/flowerpot-engine-heart-earth-grow-2756428/ 
https://pixabay.com/illustrations/smiley-yellow-happy-smile-emoticon-163510/ */
function UserMain() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [valid, setIsValid] = useState(false);
  const [weeklyProgress, setWeeklyProgress] = useState(0.0);
  const [dataInfo, setDataInfo] = useState([]);
  const [help, setHelp] = useState(false);
  const [open, setOpen] = useState(false);
  const [mental, setMental] = useState(false);

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
        body: JSON.stringify({ token: localStorage.getItem('token')}),
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
