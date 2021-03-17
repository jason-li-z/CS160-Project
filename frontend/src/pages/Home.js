import React from 'react';
import Navbar from '../components/Navbar';
import styles from './Home.module.css';
import * as BsIcons from "react-icons/bs"

function Home() {
  return (
    <div>
      <Navbar/>
      <h1 className={styles.h1}>LOGO LOCATION</h1>
      <div className={styles.center}>
        <div className={styles.left}>
        
          <div className="title">
          <p>How it Works</p>
          </div>
          <div className="inline">
            <ul>
              <BsIcons.BsArrowRight/><b>Answer a set of questions daily <br></br></b><br></br>
              <BsIcons.BsArrowRight/><b>Input the tasks you would like to get done<br></br></b><br></br>
              <BsIcons.BsArrowRight/><b>Users will get to view trends in their Productivity/Mood <br></br></b><br></br>
              <BsIcons.BsArrowRight/><b>Users will be notified if their they fall below certain thereshold <br></br></b><br></br>
              <BsIcons.BsArrowRight/><b>Users will know more about health <br></br></b><br></br>
              <BsIcons.BsArrowRight/><b>Improve mental and productivty rates<br></br></b><br></br>
            </ul>
          </div>

          
       
        </div>
        <div className={styles.right}>
          <p>Image</p>
        </div>

      </div>
    </div>
  );
}

export default Home;
