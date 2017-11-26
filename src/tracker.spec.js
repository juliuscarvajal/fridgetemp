import test from 'ava';
import { track, segreggate } from './tracker';

const input = require('./test/sample.json');

test('should return the segreggated temperatures by id from different fridges', t => {
  const actual = segreggate(input);
  const expected = { 
    a: { temperatures: [ 3.53, 3.63, 4.63, 3.53, 3.66, 3.67 ] },
    b: { temperatures: [ 4.13, 4.15, 4.15, 3.88 ] },
    c: { temperatures: [ 3.96, 3.96, 3.95, 3.36, 3.36 ] } 
  };

  t.deepEqual(actual, expected);
});

test('should return the median and mode of temperatures from different fridges', t => {
  const actual = track(input, ['average', 'median', 'mode']);
  const expected = [
    {"id":"a","average":3.78,"median":3.65,"mode":[3.53]},
    {"id":"b","average":4.08,"median":4.14,"mode":[4.15]},
    {"id":"c","average":3.72,"median":3.95,"mode":[3.36,3.96]},
  ];

  t.deepEqual(actual, expected);
});

test('should return empty array for empty input', t => {
  const actual = track([], ['average', 'median', 'mode']);
  const expected = [];

  t.deepEqual(actual, expected);
});

test('should return empty array for undefined input', t => {
  const actual = track(undefined, ['average', 'median', 'mode']);
  const expected = [];

  t.deepEqual(actual, expected);
});

test('should return empty array for undefined fields', t => {
  const actual = track(input);
  const expected = [];

  t.deepEqual(actual, expected);
});
