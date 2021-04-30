import React, { useState, useEffect } from 'react';
import NavbarUser from '../components/NavbarUser';
import Fade from '@material-ui/core/Fade';
import Userquestion from '../components/Userquestions';
import { Redirect } from 'react-router-dom';

function UserMain() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
    validate();
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
        <Userquestion />
      </div>
    </Fade>
  );
}

export default UserMain;
