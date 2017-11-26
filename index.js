const { fullDays } = require('./src/calculator');
const path = require('path');
const args = process.argv.slice(2);
const [ file ] = args;

// const fs = require('fs');

// const data = '';

// const readStream = fs.createReadStream(file, 'utf8');

// readStream.on('data', function(chunk) {  
//     data += chunk;
// }).on('end', function() {
//     console.log(data);
// });


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

function execute() {
  const days = fullDays(startDate, endDate);
  return (days == -1)
    ? help()
    : console.log(days);
}

if (args.length != 2) {
  help();
} else {
  execute();
}
