import React from 'react';
import { Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import sample from './login-video-bg.mp4';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  videoWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  video: {
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    boxShadow: '-2px 0px 16px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 0, 0, 0),
    },
  },
  form: {
    maxWidth: theme.spacing(52),
    padding: theme.spacing(5),
    width: '100%',
    zIndex: 100,
    backgroundColor: 'white',
    opacity: '90%',
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <div className={classes.videoWrapper}>
        <video className={classes.video} autoPlay loop muted>
          <source src={sample} type="video/mp4" />
        </video>
      </div>
      <Paper className={classes.paper}>
        <form className={classes.form}>
          {children}
        </form>
      </Paper>
    </main>
  );
};

export default LoginLayout;
