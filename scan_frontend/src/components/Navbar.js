import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Button, Toolbar, Typography, IconButton } from '@material-ui/core';

import transparentLogo from '../assets/transparentlogo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    
  },
  title: {
    flexGrow: 1,
  },
  navLogo: {
    height: 35, 
  },
  button: {
    fontSize: 10,
  }
}));

export const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#292929' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={transparentLogo} alt="" className={classes.navLogo} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            scanlendar
          </Typography>
          <Button color="inherit" className={classes.button}>GET STARTED!</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
