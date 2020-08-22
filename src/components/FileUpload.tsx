import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loadJSON } from './jsonSlice';
import { Button, makeStyles, createStyles } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles(() => {
  return createStyles({
    input: {
      display: 'none',
    },
    button: {
      width: '180px',
    },
  });
});

const FileUpload: React.FC = () => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    if (files && files[0]) {
      dispatch(loadJSON(files[0]));
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const classes = useStyles();

  return (
    <>
      <input
        className={classes.input}
        ref={inputRef}
        type="file"
        accept="application/JSON"
        onChange={handleChange}
      />
      <Button
        className={classes.button}
        startIcon={<PublishIcon />}
        onClick={handleClick}
      >
        Import JSON
      </Button>
    </>
  );
};

export default FileUpload;
