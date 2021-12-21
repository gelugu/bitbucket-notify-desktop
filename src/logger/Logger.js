class Logger {
  info(...obj) {
    obj.forEach((o) => console.log(o));
    console.log();
  }
  warn(...obj) {
    obj.forEach((o) => console.log(o));
    console.log();
  }
  error(...obj) {
    obj.forEach((o) => console.log(o));
    console.log();
  }
}

module.exports = new Logger();
