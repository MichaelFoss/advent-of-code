/**
 * Create a script that follows this form:
 *
 * const main = require('./main.js');
 * main(input => {
 *   // Use the input of your file here
 * });
 *
 *
 * Run the script as such:
 *
 * node your-script.js your-input-file.js
 *
 */

const fs = require('fs');

const defaultOptions = {
  stripWhitespace: true,
};

const main = (mainFn, options = {}) => {
  const allOptions = {
    ...defaultOptions,
    ...options,
  };
  const inputFile = process.argv[2];
  let input = fs
    .readFileSync(inputFile, {
      encoding: 'utf8',
      flag: 'r',
    })
    .replace(/\r/g, '');
  if (allOptions?.stripWhitespace) {
    input = input.trim();
  }
  console.log(mainFn(input));
};

module.exports = main;
