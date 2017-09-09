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
  // [Method 1] simple for loop, only for the base spec
  const aChars = [];
  if (styledString && styledString.length) {
    let wasBold = false;
    let wasItalic = false;
    for (let i = 0; i < styledString.length; i++) {
      const { char, style } = styledString[i];
      const { BOLD, ITALIC } = style;
      // 1. Should I close tags?
      if (wasItalic && !ITALIC) aChars.push('</i>');
      if (wasBold && !BOLD) aChars.push('</b>');
      // 2. Should I open tags?
      if (!wasBold && BOLD) aChars.push('<b>');
      if (!wasItalic && ITALIC) aChars.push('<i>');
      // 3. put a char
      if (char === ' ' && aChars[aChars.length - 1] === ' ') {
        aChars.push('&nbsp;');
      } else {
        aChars.push(char);
      }
      // 4. save state for next/end of the loop
      wasBold = BOLD;
      wasItalic = ITALIC;
    }
    // 4. Should I close tags?
    if (wasItalic) aChars.push('</i>');
    if (wasBold) aChars.push('</b>');
  }

  return `<p>${aChars.join('')}</p>`;
};


const SHOW_TREE = false;
const execute2 = styledString => {
  // [Method 2] for demo purpose, pseudo AST
  let i = 0;
  const parse = (tagName, currentStyle = {}) => {
    const oResult = {
      tagName,
      children: [],
    };
    if (!styledString || !styledString.length) return oResult;
    let lastChar = '';
    while (i < styledString.length) {
      const { char, style } = styledString[i];
      const { BOLD, ITALIC } = style;
      let parsed = false;
      if (currentStyle.BOLD) {
        if (!BOLD) {
          break;
        }
      } else {
        if (BOLD) {
          oResult.children.push(
            parse('b', Object.assign({}, currentStyle, { BOLD }))
          );
          parsed = true;
        }
      }
      if (currentStyle.ITALIC) {
        if (!ITALIC) {
          break;
        }
      } else {
        if (ITALIC) {
          oResult.children.push(
            parse('i', Object.assign({}, currentStyle, { ITALIC }))
          );
          parsed = true;
        }
      }
      if (!parsed) {
        if (typeof oResult.children[oResult.children.length - 1] === 'string') {
          oResult.children[oResult.children.length - 1] +=
            char === ' ' && lastChar === ' ' ? '&nbsp;' : char;
          lastChar = char;
        } else {
          oResult.children.push(char);
          lastChar = char;
        }
        i++;
      }
    }
    return oResult;
  };

  const read = oNode => {
    if (typeof oNode === 'string') return oNode;
    const { tagName, str, children } = oNode;
    if (tagName !== 'p' && children.length === 0) return '';
    return `<${tagName}>${children
      .map(oInnerNode => read(oInnerNode))
      .join('')}</${tagName}>`;
  };

  const oRoot = parse('p');
  const result = read(oRoot);
  // unroll and return
  if (SHOW_TREE) {
    console.log(JSON.stringify(oRoot, null, 1));
  }

  // return execute(styledString);
  return result;
};

/*
@param styledString: an array of nested js objects that contains information about characters and their styles
@return xmlString: string;
*/
module.exports = function(styledString) {
  // WARNING: Do not use string.replace or regex operations.
  // return execute(styledString);
  return execute2(styledString);
};
