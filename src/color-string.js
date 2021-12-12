const colors = {
  reset: '0',
  bold: '1',
  bright: '1',
  dim: '2',
  underscore: '4',
  blink: '5',
  reverse: '7',
  hidden: '8',

  black: '30',
  red: '31',
  green: '32',
  yellow: '33',
  blue: '34',
  magenta: '35',
  cyan: '36',
  white: '37',

  bgBlack: '40',
  bgRed: '41',
  bgGreen: '42',
  bgYellow: '43',
  bgBlue: '44',
  bgMagenta: '45',
  bgCyan: '46',
  bgWhite: '47',
};

/**
 * @param {string} str The text string.
 * @param {string} code The code of color.
 * @param {string} bgCode The code of background color.
 * @return {string}
 */
const strColor = (str, code, bgCode = '') => {
  if (!code) code = colors.white;

  return (bgCode ? `\x1b[${bgCode};${code}m` : `\x1b[${code}m`) + str + `\x1b[${colors.reset}m`;
};

module.exports = {
  black: (str) => strColor(str, colors.black),
  red: (str) => strColor(str, colors.red),
  green: (str) => strColor(str, colors.green),
  yellow: (str) => strColor(str, colors.yellow),
  blue: (str) => strColor(str, colors.blue),
  magenta: (str) => strColor(str, colors.magenta),
  cyan: (str) => strColor(str, colors.cyan),
  white: (str) => strColor(str, colors.white),
  bgBlack: (str, color) => strColor(str, color, colors.bgBlack),
  bgRed: (str, color) => strColor(str, color, colors.bgRed),
  bgGreen: (str, color) => strColor(str, color, colors.bgGreen),
  bgYellow: (str, color) => strColor(str, color, colors.bgYellow),
  bgBlue: (str, color) => strColor(str, color, colors.bgBlue),
  bgMagenta: (str, color) => strColor(str, color, colors.bgMagenta),
  bgCyan: (str, color) => strColor(str, color, colors.bgCyan),
  bgWhite: (str, color) => strColor(str, color, colors.bgWhite),
};

module.exports.colors = colors;
