import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

function Task() {

  const history = useHistory();
  const classes = useStyles();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const getData = async () => {
      let result = await fetch('http://localhost:5000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });
      let data = await result.json();
      //Set the variable data
      if (data.status === 200) {
        setUser(data.data.username);
      } else {
        setIsLoggedIn(false);
      }
    };
    getData();
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/"></Redirect>;
  }

  const handleTaskNameOnChange = (event) => {

    setName(event.target.value);
  };

  const handleTaskDescrOnChange = (event) => {
      
    setDescription(event.target.value);
  };
  const handleTaskDateOnChange = (event) => {
    setDate(event.target.value);
  };

  const onBack = () => {
    history.push({ pathname: '/questions', state: { message: '' } });
  };

  const add = async () => {
    let result = await fetch('http://localhost:5000/setTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
          taskArray: [
            {
              name: name,
              description: description,
              date: date,
            }
          ],
        }),
    });

    if (result.status === 200) {
      history.push({ pathname: '/questions', state: { message: 'Added task' } });
    }
  };

  return(
    <Zoom in={true} timeout={1000}>
      <div>
        <Paper
          elevation={12}
          style={{
            padding: 40,
            width: 380,
            height: 'auto',
            margin: '20px auto',
          }}
        >
          <Container className={classes.container} style={{ padding: 10 }}>
            <Typography variant="h5" style={{ paddingRight: 20 }}>
              Add a Task
            </Typography>
          </Container>
          <Container className={classes.container} style={{ paddingBottom: 15 }}>
            <TextField
              label="Task name"
              onChange={handleTaskNameOnChange}
            ></TextField>
          </Container>
          <Container className={classes.container} style={{ paddingBottom: 15 }}>
            <TextField
              label="Task description"
              onChange={handleTaskDescrOnChange}
            ></TextField>
          </Container>
          <Container className={classes.container} style={{ paddingBottom: 15 }}>
            <TextField
              label="Task date"
              type="date"
              className={classes.textField}
              onChange={handleTaskDateOnChange}
              InputLabelProps={{
                shrink: true,
              }}
            ></TextField>
          </Container>
          <Container className={classes.container} style={{ marginTop: 25, padding: 30 }}>
              <Button color="primary" style={{ marginRight: 40 }} onClick={onBack}>
                Back 
              </Button>
              <Button color="primary" style={{ marginRight: 30 }} onClick={add}>
                Submit
              </Button>
          </Container>
        </Paper>
      </div>
    </Zoom>
  );
}

export default Task;
