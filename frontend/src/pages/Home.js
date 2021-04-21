import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NavbarUser from '../components/NavbarUser';
import styles from './Home.module.css';
import * as BsIcons from 'react-icons/bs';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import logo from './logo.png';
import Footer from '../components/Footer';
import About from '../components/About';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

function Home(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [toastMsg, setToastMsg] = useState('Currently not logged in');
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Check if token has expired
    const validate = async () => {
      let result = await fetch('http://localhost:5000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });
      let data = await result.json();
      if (data.status !== 401) {
        setIsLoggedIn(true);
        setUsername(data.username);
        setToastMsg(`Currently logged in as ${username}`);
      } else {
        setIsLoggedIn(false);
      }
    };
    validate();
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setOpen(true);
    setToastMsg('Successfully logged out');
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (isLoggedIn) {
    return (
      <div>
        <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
          <Alert severity="success">{toastMsg}</Alert>
        </Snackbar>
        <NavbarUser handleLogout={handleLogout} />
        <h1 className={styles.h1}>
          <img src={logo} />
        </h1>
        <div className={styles.center}>
          <div className={styles.left}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'rgb(73, 55, 59)',
                fontSize: '29px',
              }}
            >
              <p>How it Works</p>
            </div>
            <Container
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className="inline">
                <ul>
                  <BsIcons.BsArrowRight />
                  <b>
                    Answer a set of questions daily <br></br>
                  </b>
                  <br></br>
                  <BsIcons.BsArrowRight />
                  <b>
                    Input the tasks you would like to get done<br></br>
                  </b>
                  <br></br>
                  <BsIcons.BsArrowRight />
                  <b>
                    Users will get to view trends in their Productivity/Mood <br></br>
                  </b>
                  <br></br>
                  <BsIcons.BsArrowRight />
                  <b>
                    Users will be notified if their they fall below certain thereshold <br></br>
                  </b>
                  <br></br>
                  <BsIcons.BsArrowRight />
                  <b>
                    Users will know more about health <br></br>
                  </b>
                  <br></br>
                  <BsIcons.BsArrowRight />
                  <b>
                    Improve mental and productivty rates<br></br>
                  </b>
                  <br></br>
                </ul>
              </div>
            </Container>
          </div>
          <div className={styles.right}>
            <p>Image</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert severity="success">{props.location.state !== undefined ? 'Registered successfully!' : toastMsg}</Alert>
      </Snackbar>
      <Navbar />
      <h1 className={styles.h1}>
        <img src={logo} />
      </h1>
      <div className={styles.center}>
        <div className={styles.left}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'rgb(73, 55, 59)',
              fontSize: '29px',
            }}
          >
            <p>How it Works</p>
          </div>
          <Container
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="inline">
              <ul>
                <BsIcons.BsArrowRight />
                <b>
                  Answer a set of questions daily <br></br>
                </b>
                <br></br>
                <BsIcons.BsArrowRight />
                <b>
                  Input the tasks you would like to get done<br></br>
                </b>
                <br></br>
                <BsIcons.BsArrowRight />
                <b>
                  Users will get to view trends in their Productivity/Mood <br></br>
                </b>
                <br></br>
                <BsIcons.BsArrowRight />
                <b>
                  Users will be notified if their they fall below certain thereshold <br></br>
                </b>
                <br></br>
                <BsIcons.BsArrowRight />
                <b>
                  Users will know more about health <br></br>
                </b>
                <br></br>
                <BsIcons.BsArrowRight />
                <b>
                  Improve mental and productivty rates<br></br>
                </b>
                <br></br>
              </ul>
            </div>
          </Container>
        </div>
        <div className={styles.right}>
          <p>Image</p>
        </div>
      </div>
      <div>
        <About />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
