import React from 'react';
import { Paper, makeStyles, createStyles, Theme } from '@material-ui/core';
import JSONTreeView from './JSONTreeView';
import ThemeSelect from './ThemeSelect';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    header: {
      marginBottom: theme.spacing(2),
    },
  });
});

const JSONView: React.FC = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        <ThemeSelect />
      </div>
      <JSONTreeView />
    </Paper>
  );
};

export default JSONView;
