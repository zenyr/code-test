// DO NOT MODIFY THIS FILE. THIS IS A DOCUMENTATION FOR COMPOSER.

const composer = require('../src');

describe('basic composer test', () => {
  it('should return an empty paragraph with no parameters', () => {
    expect(composer()).toEqual('<p></p>');
  });

  it('should return an empty paragraph with a zero-length array', () => {
    expect(composer([])).toEqual('<p></p>');
  });

  it('should return a proper paragraph with normal text', () => {
    expect(composer([
      { char: 't', style: { BOLD: false, ITALIC: false } },
      { char: 'e', style: { BOLD: false, ITALIC: false } },
      { char: 'x', style: { BOLD: false, ITALIC: false } },
      { char: 't', style: { BOLD: false, ITALIC: false } },
    ])).toEqual('<p>text</p>');
  });

  it('should return a proper paragraph with bold only text', () => {
    expect(composer([
      { char: 'b', style: { BOLD: true, ITALIC: false } },
      { char: 'o', style: { BOLD: true, ITALIC: false } },
      { char: 'l', style: { BOLD: true, ITALIC: false } },
      { char: 'd', style: { BOLD: true, ITALIC: false } },
    ])).toEqual('<p><b>bold</b></p>');
  });

  it('should return a proper paragraph with bold only text', () => {
    expect(composer([
      { char: 'i', style: { BOLD: false, ITALIC: true } },
      { char: 't', style: { BOLD: false, ITALIC: true } },
      { char: 'a', style: { BOLD: false, ITALIC: true } },
      { char: 'l', style: { BOLD: false, ITALIC: true } },
      { char: 'i', style: { BOLD: false, ITALIC: true } },
      { char: 'c', style: { BOLD: false, ITALIC: true } },
    ])).toEqual('<p><i>italic</i></p>');
  });

  it('should return a proper paragraph with mixed text 1', () => {
    expect(composer([
      { char: 'b', style: { BOLD: true, ITALIC: false } },
      { char: 'i', style: { BOLD: false, ITALIC: true } },
    ])).toEqual('<p><b>b</b><i>i</i></p>');
  });

  it('should return a proper paragraph with mixed text 2', () => {
    expect(composer([
      { char: 'b', style: { BOLD: true, ITALIC: true } },
      { char: 'i', style: { BOLD: true, ITALIC: true } },
    ])).toEqual('<p><b><i>bi</i></b></p>'); // can be <p><i><b>bi</b></i></p>
  });

  it('should return a proper paragraph with mixed text 3', () => {
    expect(composer([
      { char: 'b', style: { BOLD: true, ITALIC: false } },
      { char: 'i', style: { BOLD: true, ITALIC: true } },
      { char: 'b', style: { BOLD: true, ITALIC: false } },
    ])).toEqual('<p><b>b<i>i</i>b</b></p>');
  });
});
