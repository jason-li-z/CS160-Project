import React, { useState } from 'react';
import NavbarUser from '../components/NavbarUser';

function UserMain() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <NavbarUser handleLogout={handleLogout}></NavbarUser>
      Questions Components
    </div>
  );
}

export default UserMain;
