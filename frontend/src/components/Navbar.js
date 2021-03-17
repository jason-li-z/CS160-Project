import React, {useState} from 'react';
import {IconContext} from 'react-icons'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as BiIcons from "react-icons/bi"
import * as HiIcons from "react-icons/hi"


import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
  const [leftBar, setLeftBar] = useState(false);
  const displayBar = () => setLeftBar(!leftBar);

  return (
  <>
  <IconContext.Provider value={{color: 'black'}}>
    <div className = 'navbar'>
      <Link to="#" className='menu-bars'>
        <FaIcons.FaBars onClick={displayBar}/>
      </Link>
    <div className = 'title'>
      <b>Productivity/Mood Tracker</b>
    </div>
  
    <Link to="#" className='login-bars'>
      <Link to="#" className='spacing'>
        <HiIcons.HiUserAdd onClick={displayBar}/>           
      </Link>
      {/*Login page for onclick*/}
      <BiIcons.BiLogIn onClick={displayBar}/>
      {/*Sign Up page for onclick*/}
      {/*<FaIcons.FaAddressBook onClick={displayBar}/> */}
    </Link>
    </div>
    <nav className={leftBar ? 'nav-menu active' : 'nav-menu'}>
      <ul className='nav-menu-items' onClick={displayBar}>
      {/*Displays the close icon */}
        <li className='navbar-toggle'>
          <Link to="#" className='menu-bars'>
            <AiIcons.AiOutlineClose />
          </Link>
        </li>
      </ul>
    </nav>
    </IconContext.Provider>
  </>
  )
}

export default Navbar;
