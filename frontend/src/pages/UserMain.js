  
import React, { useState } from 'react';
import NavbarUser from '../components/NavbarUser';
import Fade from '@material-ui/core/Fade';
import Userquestion from '../components/Userquestions';

function UserMain() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Fade in={true} timeout={1000}>
      <div>
        <NavbarUser handleLogout={handleLogout}></NavbarUser>
        <Userquestion/>
      </div>
    </Fade>
  );
}

export default UserMain;
