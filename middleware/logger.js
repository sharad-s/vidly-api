function log(req, res, next) {
  console.log(`Logging request: ${req}`);
  next();
}

module.exports = log;
