import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import DataColumn from '../components/DataColumn';
import styles from './Data.module.css';
import NavbarUser from '../components/NavbarUser';

function Data() {
  const [arr, setArr] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getDatas = async () => {
      let userInfo = await fetch('http://localhost:5000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });

      let userInfoData = await userInfo.json();

      if (userInfoData.status === 200) {
        setUsername(userInfoData.data.username);
      }
    };

    const getUserInfo = async () => {
      let result = await fetch('http://localhost:5000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });
      let data = await result.json();
      console.log(data);
      if (data.status === 200) {
        setArr(data.data.questionArray);
      }
    };
    getDatas();
    getUserInfo();
  }, []);

  /*Will render how many rows are associated with the user*/
  function getarray(array) {
    var rows = [];
    var tableRows = [];
    for (var i = 0; i < array.length; i++) {
      rows.push(array[i]);
    }
    //console.log(array[0].q9);
    // console.log();
    rows.forEach(function (item) {
      var q1 = item.q1;
      var q2 = item.q2;
      var q3 = item.q3;
      var q4 = item.q4;
      var q5 = item.q5;
      var q6 = item.q6;
      var q7 = item.q7;
      var q8 = item.q8;
      var q9 = item.q9;
      var q10 = item.q10;
      //console.log(i);
      tableRows.push(<DataColumn q1={q1} q2={q2} q3={q3} q4={q4} q5={q5} q6={q6} q7={q7} q8={q8} q9={q9} q10={q10} />);
    });
    return tableRows;
  }

  return (
    <>
      <NavbarUser />
      <div className={styles.table}>
        <table border="1" bordercolor="blue" width="100%">
          <td colSpan="11" align="center">
            <h3>
              <b>Displaying data for: {username}</b>
            </h3>{' '}
          </td>
          <tr>
            <td> </td>
            <td className={styles.row}>Question 1</td>
            <td className={styles.row}>Question 2</td>
            <td className={styles.row}>Question 3</td>
            <td className={styles.row}>Question 4</td>
            <td className={styles.row}>Question 5</td>
            <td className={styles.row}>Question 6</td>
            <td className={styles.row}>Question 7</td>
            <td className={styles.row}>Question 8</td>
            <td className={styles.row}>Question 9</td>
            <td className={styles.row}>Question 10</td>
          </tr>
          {getarray(arr)}
        </table>
      </div>
    </>
  );
}

export default Data;
