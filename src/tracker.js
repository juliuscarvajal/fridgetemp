require('./math');

const segreggate = data => data.reduce((results, current) => {
  const { id, temperature } = current;
  const { temperatures = [] } = results[id] || {};
  return {
    ...results,
    [id]: {
      temperatures: [...temperatures, temperature]
    }
  };
}, {});

const sum = numbers => numbers.reduce((results, current) => results + current, 0);

const occurences = (numbers) => numbers.reduce((results, current) => {
  const occurences = results[current] || 0;
  return {
    ...results,
    [current]: occurences + 1
  };
}, {});

const average = numbers => Math.round10(sum(numbers) / numbers.length, -2);
const median = (numbers) => {
  const sorted = numbers.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const isEven = sorted.length % 2 === 0;
  return Math.round10(isEven ? (sorted[middle] + sorted[middle - 1]) / 2 : sorted[middle], -2);
};
const mode = numbers => Object.entries(occurences(numbers))
  .filter(([number, occurences]) => occurences > 1)
  .map(([number]) => parseFloat(number));

const supportedFields = {
  average,
  median,
  mode,
};

const track = (data, fields) => Object.entries(segreggate(data)).map(([id, value]) => {
  const { temperatures } = value;
  const merged = fields.reduce((results, current) => {
    return {
      ...results,
      [current]: supportedFields[current](temperatures),
    };
  }, {});
  
  return { id, ...merged };
});

module.exports = {
  track,
  segreggate,
};