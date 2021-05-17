import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as FcIcons from 'react-icons/fc';
//import './Footer.css';
import styles from './Footer.module.css';
import { Linka } from 'react-router-dom';
import {HashLink as Link} from 'react-router-hash-link';
import { Container } from '@material-ui/core';

//Bottom of screen 
function Footer()
{

    return (
        <>
        
        <div className={styles.navbar}>
          <div className={styles.navbartitle}>
            <Link to="/register" className={styles.spacing}>
              <AiIcons.AiFillLinkedin  />
            </Link>
            <Link to="/register" className={styles.spacing}>
              <AiIcons.AiFillFacebook />
            </Link>
            <Link to="/register" className={styles.spacing}>
              <AiIcons.AiFillGithub />
            </Link>
          </div>
        </div>
        </>

    );
}

export default Footer;