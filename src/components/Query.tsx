/* global window */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaths, setQuery } from './jsonSlice';
import jp from 'jsonpath';
import { RootState } from './rootReducer';
import { AnyJSON } from './types';
import { InputBase } from '@material-ui/core';

const QUERY_LIMIT = 5000;
const DEBOUNCE_WAIT = 1500;

let timeout: number;

const Query: React.FC = () => {
  const dispatch = useDispatch();

  const json = useSelector((state: RootState) => state.json.data);
  const query = useSelector((state: RootState) => state.json.query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  useEffect(() => {
    window.clearTimeout(timeout);

    timeout = window.setTimeout(() => {
      try {
        const paths = jp.paths(json as AnyJSON, query, QUERY_LIMIT);
        dispatch(setPaths(paths));
      } catch (err) {
        // Invalid jsonpath query
        // Let's not mess with state at this point
      }
    }, DEBOUNCE_WAIT);
  }, [query, json, dispatch]);

  return (
    <InputBase
      fullWidth
      id="JSONPath"
      placeholder="Enter a JSONPath query"
      value={query}
      onChange={handleChange}
    />
  );
};

export default Query;
