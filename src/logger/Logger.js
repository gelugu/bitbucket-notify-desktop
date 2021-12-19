class Logger {
  info(text) {
    console.log(text);
  }
  warn(text) {
    console.warn(text);
  }
  error(text) {
    console.error(text);
  }
}

module.exports = new Logger();
