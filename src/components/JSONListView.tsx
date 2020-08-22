import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import jp from 'jsonpath';
import JSONTree from 'react-json-tree';
import { JSONPath, AnyJSON, JSONValue } from './types';
import { Pagination } from '@material-ui/lab';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { getBase16Theme } from './helper';

const PAGE_SIZE = 50;

type Result = {
  key: string;
  value: JSONValue;
};

const getPathResult = (json: AnyJSON, path: JSONPath): Result => {
  const key = jp.stringify(path);
  return {
    key,
    value: jp.value(json, key),
  };
};

const getPathRange = (
  jsonPaths: JSONPath[],
  pageNumber: number,
): JSONPath[] => {
  const from = (pageNumber - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;
  return jsonPaths.slice(from, to);
};

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    list: {
      listStyleType: 'none',
      padding: 0,
      marginBottom: theme.spacing(2),
    },
    listItem: {
      display: 'flex',
      borderBottom: `1px solid ${theme.palette.divider}`,
      '& > ul': {
        flex: 1,
      },
    },
    listItemNumber: {
      marginTop: '.5em',
      marginRight: theme.spacing(1),
    },
  });
});

const JSONListView: React.FC = () => {
  const { theme, json, paths } = useSelector((state: RootState) => {
    return {
      theme: state.json.theme,
      json: state.json.data,
      paths: state.json.paths,
    };
  });

  const [page, setPage] = useState(1);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const results = getPathRange(paths, page).map((path) => {
      return getPathResult(json, path);
    });
    setResults(results);
  }, [page, json, paths]);

  const numPages = Math.ceil(paths.length / PAGE_SIZE);
  const pageStart = (page - 1) * PAGE_SIZE;

  const classes = useStyles();

  return (
    <>
      <ol className={classes.list}>
        {results.map((raw, index) => (
          <li className={classes.listItem} key={index}>
            <span className={classes.listItemNumber}>
              {pageStart + index + 1 + '.'}
            </span>
            <JSONTree
              theme={getBase16Theme(theme)}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data={raw.value as any}
              keyPath={[raw.key]}
            />
          </li>
        ))}
      </ol>
      {numPages > 1 && (
        <Pagination
          color="primary"
          count={numPages}
          page={page}
          onChange={(e: React.ChangeEvent<unknown>, page: number) => {
            setPage(page);
          }}
        />
      )}
    </>
  );
};

export default JSONListView;
