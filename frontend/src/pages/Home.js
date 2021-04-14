import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NavbarUser from '../components/NavbarUser';
import styles from './Home.module.css';
import * as BsIcons from 'react-icons/bs';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token') !== 'null') {
      setJwt(localStorage.getItem('token'));
      setIsLoggedIn(true);
    } else {
      setJwt(null);
      setIsLoggedIn(false);
    }
  });

  // console.log(jwt);
  if (isLoggedIn) {
    return (
      <div>
        <NavbarUser />
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
                    Users will get to view trends in their Productivity/Mood{' '}
                    <br></br>
                  </b>
                  <br></br>
                  <BsIcons.BsArrowRight />
                  <b>
                    Users will be notified if their they fall below certain
                    thereshold <br></br>
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
                  Users will get to view trends in their Productivity/Mood{' '}
                  <br></br>
                </b>
                <br></br>
                <BsIcons.BsArrowRight />
                <b>
                  Users will be notified if their they fall below certain
                  thereshold <br></br>
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
