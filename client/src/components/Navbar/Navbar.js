import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { ThemeProvider } from 'styled-components';
import DarkModeToggle from 'react-dark-mode-toggle';
import { GlobalStyles } from '../Themes/GlobalStyles';
import { lightTheme, darkTheme } from '../Themes/Themes';

import logo from '../../images/logo75.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import '../../App.css';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  const themeToggler = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className="appBar noselect" style={{ transition: '0.25s' }} position="static" color="inherit">
      <div className="brandContainer">
        <img component={Link} to="/" className="image" src={logo} alt="icon" height="60" />
        <Typography component={Link} to="/" className="brand" variant="h4" align="center">SupWeather</Typography>
      </div>
      <Toolbar className="toolbar">
        {user?.result ? (
          <div className="profile">
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className="userName" variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className="logout" style={{ backgroundColor: '#5FCB7B', color: 'white' }} onClick={logout}>Logout</Button>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
              <>
                <GlobalStyles />
                <DarkModeToggle
                  className="switchToggle"
                  onChange={themeToggler}
                  checked={theme === 'dark'}
                  size={80}
                />
              </>
            </ThemeProvider>
          </div>
        ) : (
          <div className="login">
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
              <>
                <GlobalStyles />
                <DarkModeToggle
                  className="switchToggle"
                  onChange={themeToggler}
                  checked={theme === 'dark'}
                  size={80}
                />
              </>
            </ThemeProvider>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
