import React from 'react';
import { makeStyles, Theme, createStyles, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Query from './Query';
import FileUpload from './FileUpload';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

const JSONControls: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Query />
      <Divider className={classes.divider} orientation="vertical" />
      <FileUpload />
    </Paper>
  );
};

export default JSONControls;
