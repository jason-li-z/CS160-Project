import React, { useState, useEffect } from 'react';
import NavbarUser from '../components/NavbarUser';
import Fade from '@material-ui/core/Fade';
import Userquestion from '../components/Userquestions';
import { Redirect } from 'react-router-dom';

function UserMain() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [valid, setIsValid] = useState(false);

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
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });
      let data = await result.json();
      if (data.status === 200) {
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
    validate();
    getUserInfo();
    // let date = new Date(last.date);
    // let nextMidnight = date.setHours(24, 0, 0, 0);
    // console.log(nextMidnight);
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/"></Redirect>;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Fade in={true} timeout={1000}>
      <div>
        <NavbarUser handleLogout={handleLogout}></NavbarUser>
        {valid ? (
          <Userquestion />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '85vh' }}>
            <Fade in={true}>
              <h2>You've already answered recently, please come back tomorrow or at 12AM.</h2>
            </Fade>
          </div>
        )}
      </div>
    </Fade>
  );
}

export default UserMain;
