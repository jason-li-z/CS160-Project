import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NavbarUser from '../components/NavbarUser';
import styles from './Home.module.css';
import * as BsIcons from 'react-icons/bs';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      } else {
        setIsLoggedIn(false);
      }
    };
    validate();
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div>
        <NavbarUser handleLogout={handleLogout} />
        <h1 className={styles.h1}>LOGO LOCATION</h1>
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
      <Navbar />
      <h1 className={styles.h1}>LOGO LOCATION</h1>
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

export default Home;
