import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 0,
    fontFamily: 'Pinyon Script, cursive',
    fontSize: '3rem',
    color: 'maroon',
    marginLeft: 'auto'
  },
  navLinks: {
    marginLeft: 'auto',
    display: 'flex',
    gap: '1rem',
  },
  button: {
    color: 'black',
    fontFamily: 'Julius Sans One, sans-serif',
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="absolute" color="default">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Cuisine Louisiane
        </Typography>
        <div className={classes.navLinks}>
          <Button className={classes.button} component={Link} to="/">Home</Button>
          <Button className={classes.button} component={Link} to="/ourvenue">Our Venue</Button>
          <Button className={classes.button} component={Link} to="/menus">Menus</Button>
          <Button className={classes.button} component={Link} to="/gallery">Gallery</Button>
          <Button className={classes.button} component={Link} to="/designyourmenu">Design Your Menu</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;