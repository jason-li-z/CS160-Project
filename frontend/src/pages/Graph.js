import React, { useEffect, useState } from 'react';
import NavbarUser from '../components/NavbarUser';
import { Redirect } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

function Graph() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState('');
  const [graphData, setGraphData] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
  };
  useEffect(() => {
    setWaiting(true);
    const validate = async () => {
      let result = await fetch('http://localhost:5000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });
      let userInfoData = await result.json();
      if (userInfoData.status !== 401) {
        setUsername(userInfoData.data.username);
      } else {
        setIsLoggedIn(false);
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
      if (data.status === 200) {
        setGraphData(data.data.questionArray);
      }
    };

    validate();
    getUserInfo();
    setWaiting(false);
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const getDateLabels = () => {
    let dateArr = [];
    graphData.forEach((dataPoint) => {
      let date = new Date(dataPoint.date).toISOString().substring(0, 10);
      dateArr.push(date);
    });
    return dateArr;
  };

  const getQ2 = (arg) => {
    let result = [];
    graphData.forEach((dataPoint) => {
      result.push(dataPoint.q2);
    });
    return result;
  };

  const getQ3 = () => {
    let result = [];
    graphData.forEach((dataPoint) => {
      result.push(dataPoint.q3);
    });
    return result;
  };

  const getQ5 = () => {
    let result = [];
    graphData.forEach((dataPoint) => {
      result.push(dataPoint.q5);
    });
    return result;
  };

  const getQ6 = () => {
    let result = [];
    graphData.forEach((dataPoint) => {
      result.push(dataPoint.q6);
    });
    return result;
  };

  if (!waiting) {
    let dateLabels = getDateLabels();

    const chart = {
      labels: dateLabels,
      datasets: [
        {
          label: 'Mental State',
          data: getQ2(),
          backgroundColor: '#94aaed',
          borderCoor: '#94aaed',
          borderWidth: 3,
          tension: 0.2,
        },
        {
          label: 'Overall Progress',
          data: getQ3(),
          backgroundColor: '#5de1d5',
          borderColor: '#5de1d5',
          borderWidth: 3,
          tension: 0.2,
        },
        {
          label: 'Goals Achieved Planned',
          data: getQ5(),
          backgroundColor: '#bc2b79',
          borderColor: '#bc2b79',
          borderWidth: 3,
          tension: 0.2,
        },
        {
          label: 'Goals Actually Achieved',
          data: getQ6(),
          backgroundColor: '#fba01e',
          borderColor: '#fba01e',
          borderWidth: 3,
          tension: 0.2,
        },
      ],
    };

    return (
      <div>
        <NavbarUser handleLogout={handleLogout}></NavbarUser>
        <div
          style={{
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '40px',
            width: '1280px',
            height: '900px',
          }}
        >
          <Line
            data={chart}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          ></Line>
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default Graph;
