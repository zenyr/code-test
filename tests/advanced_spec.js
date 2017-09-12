// TODO: Add tests that you find necessary.
const composer = require('../src');

describe('advanced composer test', () => {
  it('should allow emojis', () => {
    expect(
      composer([{ char: '😋', style: { BOLD: false, ITALIC: false } }]),
    ).toEqual('<p>😋</p>');
  });
  it('should allow mixed up bold and italic', () => {
    expect(
      composer([
        { char: 'a', style: { BOLD: false, ITALIC: false } },
        { char: 'b', style: { BOLD: true, ITALIC: false } },
        { char: 'c', style: { BOLD: true, ITALIC: true } },
        { char: 'd', style: { BOLD: true, ITALIC: false } },
      ]),
    ).toEqual('<p>a<b>b<i>c</i>d</b></p>');
    expect(
      composer([
        { char: 'a', style: { BOLD: false, ITALIC: false } },
        { char: 'b', style: { BOLD: true, ITALIC: true } },
        { char: 'c', style: { BOLD: false, ITALIC: true } },
        { char: 'd', style: { BOLD: false, ITALIC: false } },
      ]),
    ).toEqual('<p>a<b><i>b</i></b><i>c</i>d</p>');
  });
  it('should render a space', () => {
    expect(
      composer([
        { char: 'a', style: { BOLD: false, ITALIC: false } },
        { char: ' ', style: { BOLD: true, ITALIC: false } },
        { char: ' ', style: { BOLD: true, ITALIC: true } },
        { char: 'c', style: { BOLD: true, ITALIC: true } },
        { char: 'd', style: { BOLD: true, ITALIC: false } },
      ]),
    ).toEqual('<p>a<b>&nbsp;<i>&nbsp;c</i>d</b></p>');
  });
  it('should render consecutive spaces', () => {
    expect(
      composer([
        { char: 'a', style: { BOLD: false, ITALIC: false } },
        { char: ' ', style: { BOLD: true, ITALIC: false } },
        { char: ' ', style: { BOLD: true, ITALIC: false } },
        { char: 'c', style: { BOLD: true, ITALIC: true } },
        { char: 'd', style: { BOLD: true, ITALIC: false } },
      ]),
    ).toEqual('<p>a<b>&nbsp;&nbsp;<i>c</i>d</b></p>');
  });
});
