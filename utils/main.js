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

const main = mainFn => {
  const inputFile = process.argv[2];
  const input = fs.readFileSync(inputFile, {
    encoding: 'utf8',
    flag: 'r',
  })
    .trim();
  console.log(mainFn(input));
}

module.exports = main;

