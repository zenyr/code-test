// Method 3
//   class based implementation

class StyledStringParser {
  /* IF static syntax is supported
    static STYLES = { ... };
    static ESCAPE = { ... };
    static _stringify (...) { ... }
    static _compareStyles (...) { ... }
  */

  constructor(aStyledString) {
    this.i = 0;
    this.aStyledString = aStyledString;
  }

  parse() {
    this.i = 0;
    return this._walk('p');
  }

  toString() {
    return StyledStringParser._stringify(this.parse());
  }

  _walk(tagName, currentStyle = {}) {
    const oResult = {
      tagName,
      children: [],
    };

    // base case : empty result
    if (!this.aStyledString || !this.aStyledString.length) return oResult;
    let wasString = false;
    while (this.i < this.aStyledString.length) {
      const { char, style } = this.aStyledString[this.i];
      const styleDiff = StyledStringParser._compareStyles(currentStyle, style);
      if (styleDiff) {
        // Case 1. Style has changed somehow
        const [styleName, tagName, styleActive] = styleDiff;
        if (styleActive) {
          // Case 1-1. we should open a new tag
          oResult.children.push(
            this._walk(
              tagName,
              Object.assign({}, currentStyle, {
                [styleName]: styleActive,
              }),
            ),
          );
          wasString = false;
        } else {
          // Case 1-2. we should close current tag
          break;
        }
      } else {
        // Case 2. simple string
        const escapedChar = StyledStringParser.ESCAPE[char] || char;
        if (wasString) {
          // Case 2-1. re-use last child string
          oResult.children[oResult.children.length - 1] += escapedChar;
        } else {
          // Case 2-2. create a child string
          oResult.children.push(escapedChar);
        }
        wasString = true;
        // Move token pointer only after success
        this.i += 1;
      }
    }
    return oResult;
  }
}

/* IF static syntax is NOT supported */
StyledStringParser.STYLES = {
  BOLD: 'b',
  ITALIC: 'i',
};

StyledStringParser.ESCAPE = {
  ' ': '&nbsp;',
  '<': '&lt;',
  '>': '&gt;',
};
// static(instance agnostic) tree serializer
StyledStringParser._stringify = oNode => {
  // base case: node is a string
  if (typeof oNode === 'string') return oNode;
  const { tagName, children } = oNode;
  return `<${tagName}>${children
    .map(StyledStringParser._stringify)
    .join('')}</${tagName}>`;
};
// static(instance agnostic) shallow style diff
StyledStringParser._compareStyles = (currentStyle, newStyle) => {
  for (let styleName in newStyle) {
    // we could check hasOwnProperty here but negligible with STYLES check and static typing
    if (StyledStringParser.STYLES[styleName]) {
      if (!!currentStyle[styleName] !== !!newStyle[styleName]) {
        return [
          styleName,
          StyledStringParser.STYLES[styleName],
          newStyle[styleName],
        ];
      }
    }
  }
  return false;
};
/**/

module.exports = StyledStringParser;
