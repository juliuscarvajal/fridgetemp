import test from 'ava';
import { track, segreggate } from './tracker';

const input = [
  {"id": "a","timestamp": 1509493641,"temperature": 3.53},
  {"id": "b","timestamp": 1509493642,"temperature": 4.13},
  {"id": "c","timestamp": 1509493643,"temperature": 3.96},
  {"id": "a","timestamp": 1509493644,"temperature": 3.63},
  {"id": "c","timestamp": 1509493645,"temperature": 3.96},
  {"id": "a","timestamp": 1509493645,"temperature": 4.63},
  {"id": "a","timestamp": 1509493646,"temperature": 3.53},
  {"id": "b","timestamp": 1509493647,"temperature": 4.15},
  {"id": "c","timestamp": 1509493655,"temperature": 3.95},
  {"id": "a","timestamp": 1509493677,"temperature": 3.66},
  {"id": "b","timestamp": 1510113646,"temperature": 4.15},
  {"id": "c","timestamp": 1510127886,"temperature": 3.36},
  {"id": "c","timestamp": 1510127892,"temperature": 3.36},
  {"id": "a","timestamp": 1510128112,"temperature": 3.67},
  {"id": "b","timestamp": 1510128115,"temperature": 3.88}
];

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
