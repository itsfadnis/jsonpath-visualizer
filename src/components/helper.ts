import jp from 'jsonpath';
import { JSONPath, Base16ThemeName, AnyJSON } from './types';
import { Base16Theme } from 'base16';
import * as base16 from 'base16';

export type NodeStyle = {
  [key: string]: string;
};

// react-json-tree emits key paths from leaf to root node, hence the reversal
const getNodePath = (keyPath: JSONPath): JSONPath => {
  const path = [...keyPath];
  path.reverse();
  return path;
};

export const shouldExpandNode = (
  keyPath: JSONPath,
  jsonPaths: JSONPath[],
): boolean => {
  const stringPath = jp.stringify(getNodePath(keyPath));
  return jsonPaths.some(
    (jsonPath) => jp.stringify(jsonPath).indexOf(stringPath) === 0,
  );
};

export const shouldHighlightNode = (
  keyPath: JSONPath,
  jsonPaths: JSONPath[],
): boolean => {
  const stringPath = jp.stringify(getNodePath(keyPath));
  return jsonPaths.some((jsonPath) => jp.stringify(jsonPath) === stringPath);
};

export const getNodeStyle = (
  style: NodeStyle,
  keyPath: JSONPath,
  jsonPaths: JSONPath[],
): { style: NodeStyle } => {
  const shouldBeHighlighted = shouldHighlightNode(keyPath, jsonPaths);
  if (!shouldBeHighlighted) {
    return { style };
  }
  return {
    style: {
      ...style,
      fontWeight: 'bold',
      fontSize: '1.1em',
    },
  };
};

export const shouldExpandRange = (
  keyPath: JSONPath,
  jsonPaths: JSONPath[],
  from: number,
  to: number,
  data: AnyJSON,
): boolean => {
  const nodePath = getNodePath(keyPath);
  return jsonPaths.some((jsonPath) => {
    // Return false if path is shorter than range path,
    // or path does not contain range path
    if (
      jsonPath.length <= nodePath.length ||
      jp.stringify(jsonPath).indexOf(jp.stringify(nodePath)) === -1
    ) {
      return false;
    }

    // A string or number possibly in range
    const possiblyInRange = jsonPath[nodePath.length];

    // If range is an array
    if (typeof possiblyInRange === 'number') {
      return from <= possiblyInRange && possiblyInRange <= to;
    }

    // If range is an object
    const keyIndex = Object.keys(data).indexOf(possiblyInRange);
    return from <= keyIndex && keyIndex <= to;
  });
};

export const getBase16Theme = (name: Base16ThemeName): Base16Theme => {
  // eslint-disable-next-line import/namespace
  return base16[name];
};
