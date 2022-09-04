const outToConsole = (...args) => process.stdout.write(args.join(' ') + '\n');

module.exports = {
  outToConsole,
};
