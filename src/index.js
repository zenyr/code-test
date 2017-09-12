/*
composer function receives a data structure describing styled texts and returns an XML of the parsed string.

[{ char: 't', style: { BOLD: false, ITALIC: false } }] => <p>t</p>
[{ char: 'b', style: { BOLD: true, ITALIC: false } }] => <p><b>b</b></p>
[{ char: 'i', style: { BOLD: false, ITALIC: true } }] => <p><i>i</i></p>

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
type style = {
  BOLD: boolean;
  ITALIC: boolean;
};

interface styledChar {
  char: string; // single character
  style: style;
};

type styledString = styledChar[];
*/

/**
 * Method 1
 */

const execute = require('./method1');

/**
 * Method 2
 */

const execute2 = require('./method2');

/**
 * Method 3 Parser class
 */
const StyledStringParser = require('./method3')

const execute3 = styledString => {
  const parser = new StyledStringParser(styledString);
  return parser.toString();
};

/*
@param styledString: an array of nested js objects that contains information about characters and their styles
@return xmlString: string;
*/
module.exports = function(styledString) {
  // return execute(styledString);
  // return execute2(styledString);
  return execute3(styledString);
};
