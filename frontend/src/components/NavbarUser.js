import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as FcIcons from 'react-icons/fc';
import * as CgIcons from 'react-icons/cg';
import * as GoIcons from 'react-icons/go';
import './Navbar.css';
import {HashLink as Link} from 'react-router-hash-link';

const barData = [
  {
    title: 'Home',
    link: './',
    icon: <ImIcons.ImHome/>,
    classname: 'nav-text'  
  },
  //LINK IS NOT SET UP YET
  {
    title: 'Graph',
    link: "./#inline",
    icon: <GoIcons.GoGraph/>,
    classname: 'nav-text'
  },
  //LINK IS NOT SET UP YET
  {
    title: 'User Data',
    link: "./#inline",
    icon: <BiIcons.BiCalendarWeek/>,
    classname: 'nav-text'
  }
]

function NavbarUser() {
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
            <Link to="/profile" className="spacing">
              <CgIcons.CgProfile />
            </Link>
            <Link to="/" className="spacing">
              <BiIcons.BiLogOut />
            </Link>
            {/*Sign Up page for onclick*/}
            {/*<FaIcons.FaAddressBook onClick={displayBar}/> */}
          </Link>
        </div>
        <nav className={leftBar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={displayBar}>
            {/*Displays the close icon */}
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {barData.map((item, index) => {
          return (
            <li key = {index} className={item.classname}>
              <Link to={item.link}>
                {item.icon} <pre>  </pre><span>{item.title}</span>
              </Link>
            </li>
          )
        })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavbarUser;