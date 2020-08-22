import React from 'react';
import { JSONPath, AnyJSON } from './types';
import JSONTree from 'react-json-tree';
import {
  shouldExpandNode,
  shouldExpandRange,
  getNodeStyle,
  NodeStyle,
  getBase16Theme,
} from './helper';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';

const JSONTreeView: React.FC = () => {
  const json = useSelector((state: RootState) => state.json.data);
  const jsonPaths = useSelector((state: RootState) => state.json.paths);
  const theme = useSelector((state: RootState) => state.json.theme);

  const base16Theme = {
    extend: getBase16Theme(theme),
    valueText: (
      { style }: { style: NodeStyle },
      nodeType: string,
      keyPath: JSONPath,
    ) => getNodeStyle(style, keyPath, jsonPaths),
    valueLabel: (
      { style }: { style: NodeStyle },
      nodeType: string,
      keyPath: JSONPath,
    ) => getNodeStyle(style, keyPath, jsonPaths),
    nestedNode: ({ style }: { style: NodeStyle }, keyPath: JSONPath) =>
      getNodeStyle(style, keyPath, jsonPaths),
  };

  return (
    <JSONTree
      data={json}
      theme={base16Theme}
      keyPath={['$']}
      collectionLimit={20}
      shouldExpandNode={(keyPath) => shouldExpandNode(keyPath, jsonPaths)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      shouldExpandRange={(
        nodePath: JSONPath,
        from: number,
        to: number,
        data: AnyJSON,
      ) => {
        return shouldExpandRange(nodePath, jsonPaths, from, to, data);
      }}
    />
  );
};

export default JSONTreeView;
