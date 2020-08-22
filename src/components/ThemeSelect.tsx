import React from 'react';
import * as base16 from 'base16';
import {
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './jsonSlice';
import { RootState } from './rootReducer';
import { Base16ThemeName } from './types';

const themes = Object.keys(base16).slice(1);

const useStyles = makeStyles(() => {
  return createStyles({
    formControl: {
      minWidth: '150px',
      '& label + .MuiInput-formControl': {
        marginTop: 0,
      },
    },
  });
});

const ThemeSelect: React.FC = () => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    dispatch(setTheme(event.target.value as Base16ThemeName));
  };

  const theme = useSelector((state: RootState) => state.json.theme);
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <FormLabel htmlFor="Theme">Theme</FormLabel>
      <Select id="Theme" value={theme} onChange={handleChange}>
        {themes.map((themeName) => {
          return (
            <MenuItem key={themeName} value={themeName}>
              {themeName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ThemeSelect;
