export type JSONPrimitive = string | number | boolean | null;

export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export type JSONObject = { [key: string]: JSONValue };

export type JSONArray = JSONValue[];

export type AnyJSON = JSONObject | JSONArray;

export type JSONPath = (string | number)[];

export type Base16ThemeName =
  | 'threezerotwofour'
  | 'apathy'
  | 'ashes'
  | 'atelierDune'
  | 'atelierForest'
  | 'atelierHeath'
  | 'atelierLakeside'
  | 'atelierSeaside'
  | 'bespin'
  | 'brewer'
  | 'bright'
  | 'chalk'
  | 'codeschool'
  | 'colors'
  | 'default'
  | 'eighties'
  | 'embers'
  | 'flat'
  | 'google'
  | 'grayscale'
  | 'greenscreen'
  | 'harmonic'
  | 'hopscotch'
  | 'isotope'
  | 'marrakesh'
  | 'mocha'
  | 'monokai'
  | 'ocean'
  | 'paraiso'
  | 'pop'
  | 'railscasts'
  | 'shapeshifter'
  | 'solarized'
  | 'summerfruit'
  | 'tomorrow'
  | 'tube'
  | 'twilight';
