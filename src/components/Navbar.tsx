import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Container,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    navbar: {
      marginBottom: theme.spacing(4),
    },
    toolbar: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    heading: {
      flexGrow: 1,
    },
  });
});

const Navbar: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.navbar}>
      <Container>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.heading}>
            JSONPath visualizer
          </Typography>
          <IconButton
            component="a"
            href="https://github.com/itsfadnis"
            edge="start"
            color="inherit"
            aria-label="GitHub repository"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default React.memo(Navbar);
