const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const { track } = require('./src/tracker');
const readFile = promisify(fs.readFile);
const args = process.argv.slice(2);
const [ file ] = args;

function help() {
  const helpMsg = `
  Fridge Temperature Tracker:
  
  Outputs the average, median and mode temperature for each fridge
  
  Usage: ${path.basename(process.argv[0])} ${path.basename(process.argv[1])} file-name-with-relevant-data.json
  
  Where:
  file-name-with-relevant-data.json has the relevant fridge data with the following format:
  [
    {"id": "a","timestamp": 1509493641,"temperature": 3.53},
    {"id": "b","timestamp": 1509493642,"temperature": 4.13},
    {"id": "c","timestamp": 1509493643,"temperature": 3.96},
    {"id": "a","timestamp": 1509493644,"temperature": 3.63},
    ...
  ]
  `;

  console.log(helpMsg);
}

async function execute() {
  const src = JSON.parse(await readFile(file, 'utf8'));
  const data = track(src, ['average', 'median', 'mode']);
  console.log(data);
  return data
}

if (args.length !== 1) {
  help();
} else {
  execute();
}
