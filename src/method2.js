// Method 2
//  for demo purpose, pseudo AST, within a single closure without leaking scopes

const SHOW_TREE = false;
const STYLES = {
  BOLD: 'b',
  ITALIC: 'i',
};
const ESCAPE = {
  ' ': '&nbsp;',
  '<': '&lt;',
  '>': '&gt;',
};

// Note: this function conceils its implementation safely
module.exports = styledString => {
  // token position
  let i = 0;
  const compareStyles = (currentStyle, newStyle) => {
    for (let styleName in newStyle) {
      // we could check hasOwnProperty here but negligible with STYLES check and static typing
      if (STYLES[styleName]) {
        if (!!currentStyle[styleName] !== !!newStyle[styleName]) {
          return [styleName, STYLES[styleName], newStyle[styleName]];
        }
      }
    }
    return false;
  };

  const parse = (tagName, currentStyle = {}) => {
    const oResult = {
      tagName,
      children: [],
    };

    // base case : empty result
    if (!styledString || !styledString.length) return oResult;
    let lastChar = '';
    while (i < styledString.length) {
      const { char, style } = styledString[i];
      const styleDiff = compareStyles(currentStyle, style);
      if (styleDiff) {
        // Case 1. Style has changed somehow
        const [styleName, tagName, styleActive] = styleDiff;
        if (styleActive) {
          // Case 1-1. we should open a new tag
          oResult.children.push(
            parse(
              tagName,
              Object.assign({}, currentStyle, {
                [styleName]: styleActive,
              }),
            ),
          );
          lastChar = '';
        } else {
          // Case 1-2. we should close current tag
          break;
        }
      } else {
        // Case 2. simple string
        const escapedChar = ESCAPE[char] || char;
        if (lastChar !== '') {
          // Case 2-1. re-use last child string
          oResult.children[oResult.children.length - 1] += escapedChar;
        } else {
          // Case 2-2. create a child string
          oResult.children.push(escapedChar);
        }
        lastChar = char;
        // Move token pointer only after success
        i++;
      }
    }
    return oResult;
  };

  // unroll tree and revert HTML string
  const read = oNode => {
    // base case: node is a string
    if (typeof oNode === 'string') return oNode;
    const { tagName, children } = oNode;
    return `<${tagName}>${children.map(read).join('')}</${tagName}>`;
  };

  const oRoot = parse('p');
  const result = read(oRoot);

  if (SHOW_TREE) {
    console.log(JSON.stringify(oRoot, null, 1));
  }

  return result;
};
