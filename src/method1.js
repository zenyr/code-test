// Method 1
//  simple for loop, only for the base spec. KISS

module.exports = styledString => {
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
    // 5. Should I close tags?
    if (wasItalic) aChars.push('</i>');
    if (wasBold) aChars.push('</b>');
  }
  return `<p>${aChars.join('')}</p>`;
};
