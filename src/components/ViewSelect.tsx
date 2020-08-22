import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';
import { setView } from './jsonSlice';

const ViewSelect: React.FC = () => {
  const view = useSelector((state: RootState) => state.json.view);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setView((event.target as HTMLInputElement).value));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Choose a view</FormLabel>
      <RadioGroup
        row
        aria-label="View"
        name="view"
        value={view}
        onChange={handleChange}
      >
        <FormControlLabel value="tree" control={<Radio />} label="Tree view" />
        <FormControlLabel value="list" control={<Radio />} label="List view" />
      </RadioGroup>
    </FormControl>
  );
};

export default ViewSelect;
