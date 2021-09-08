import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';
import './Navbar.css';
import { Linka } from 'react-router-dom';
import {HashLink as Link} from 'react-router-hash-link';


/**Navigaiotn bar for the project */
function Navbar() {
  const [leftBar, setLeftBar] = useState(false);
  const displayBar = () => setLeftBar(!leftBar);

  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={displayBar} />
          </Link>
          <div className="navbar-title">
            <b>Productivity/Mood Tracker</b>
          </div>
          <Link to="#" className="login-bars">
            <Link to="/register" className="spacing">
              <HiIcons.HiUserAdd />
            </Link>
            <Link to="/login" className="spacing">
              <BiIcons.BiLogIn />
            </Link>
            {/*Sign Up page for onclick*/}
            {/*<FaIcons.FaAddressBook onClick={displayBar}/> */}
          </Link>
        </div>
        <nav className='nav-menu'>
          <ul className="nav-menu-items" onClick={displayBar}>
            {/*Displays the close icon */}
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
