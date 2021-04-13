import React from 'react';
import Navbar from './Navbar';
import * as BsIcons from 'react-icons/bs';
import Container from '@material-ui/core/Container';
import {HashLink as Link} from 'react-router-hash-link';


function About()
{

    return (
        <>
        <Container>
        <h1>About Us</h1>
        <div>Productivity Tracker is am application aimed towards those that want to improve their mental well being.
            Our goal is to help you improve your mental state and get to know more about yourself as well as learn about your mood in relation to 
            your productivity.  
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </Container>
        </>

    );
}

export default About;