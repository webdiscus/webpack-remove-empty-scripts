import colstr from '../src/color-string';

beforeAll(() => {
});

beforeEach(() => {
  jest.setTimeout(2000);
});

describe('color string tests', () => {
  const colorMethod = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
  const bgColorMethod = ['bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'];

  colorMethod.forEach((color) => {
    test(`colstr.${color}`, (done) => {
      const str = 'ok';
      const received = colstr[color](str);
      const expected = `\x1b[${colstr.colors[color]}m` + str + `\x1b[${colstr.colors.reset}m`;
      expect(received).toEqual(expected);
      done();
    });
  });

  bgColorMethod.forEach((color) => {
    test(`colstr.${color}`, (done) => {
      const str = 'ok';
      const received = colstr[color](str);
      const expected = `\x1b[${colstr.colors[color]};${colstr.colors.white}m` + str + `\x1b[${colstr.colors.reset}m`;
      expect(received).toEqual(expected);
      done();
    });
  });
});