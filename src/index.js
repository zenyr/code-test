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

const execute = styledString => {
  // simple for loop, only for the base spec
  const aChars = [];
  if (styledString && styledString.length) {
    let wasBold = false;
    let wasItalic = false;
    for (let i = 0; i < styledString.length; i++) {
      const { char, style } = styledString[i];
      const { BOLD: bold, ITALIC: italic } = style;
      // 1. Should I close tags?
      if (wasItalic && !italic) aChars.push('</i>');
      if (wasBold && !bold) aChars.push('</b>');
      // 2. Should I open tags?
      if (!wasBold && bold) aChars.push('<b>');
      if (!wasItalic && italic) aChars.push('<i>');
      // 3. put a char
      aChars.push(char);
      // 4. save state for next/end of the loop
      wasBold = bold;
      wasItalic = italic;
    }
    // 4. Should I close tags?
    if (wasItalic) aChars.push('</i>');
    if (wasBold) aChars.push('</b>');
  }

  return `<p>${aChars.join('')}</p>`;
};
/*
@param styledString: an array of nested js objects that contains information about characters and their styles
@return xmlString: string;
*/
module.exports = function(styledString) {
  // WARNING: Do not use string.replace or regex operations.
  return execute(styledString);
};
