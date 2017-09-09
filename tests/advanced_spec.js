// TODO: Add tests that you find necessary.
const composer = require('../src');

describe('advanced composer test', () => {
  it('should allow emojis', () => {
    expect(composer([
      { char: '😋', style: { BOLD: false, ITALIC: false } },
    ])).toEqual('<p>😋</p>');
  });
  it('should allow mixed up bold and italic', () => {
    expect(composer([
      { char: 'a', style: { BOLD: false, ITALIC: false } },
      { char: 'b', style: { BOLD: true, ITALIC: false } },
      { char: 'c', style: { BOLD: true, ITALIC: true } },
      { char: 'd', style: { BOLD: true, ITALIC: false } },
    ])).toEqual('<p>a<b>b<i>c</i>d</b></p>');
  });
  it('should render space', () => {
    expect(composer([
      { char: 'a', style: { BOLD: false, ITALIC: false } },
      { char: ' ', style: { BOLD: true, ITALIC: false } },
      { char: ' ', style: { BOLD: true, ITALIC: true } },
      { char: 'c', style: { BOLD: true, ITALIC: true } },
      { char: 'd', style: { BOLD: true, ITALIC: false } },
    ])).toEqual('<p>a<b> <i> c</i>d</b></p>');
  });
});
