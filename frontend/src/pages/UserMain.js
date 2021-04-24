  
import React, { useState } from 'react';
import NavbarUser from '../components/NavbarUser';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function UserMain() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const classes = useStyles();

  return (
    <Fade in={true} timeout={1000}>
      <div>
        <NavbarUser handleLogout={handleLogout}></NavbarUser>
        <Container className={classes.container} style={{ marginTop: 25, padding: 30 }}>
            <Link to="/questions" style={{ color: 'inherit', textDecoration: 'inherit' }}>
              {' '}
              <Button variant="contained" color="primary" >
                Daily Questionnaire
              </Button>
            </Link>
        </Container>
      </div>
    </Fade>
  );
}

export default UserMain;
