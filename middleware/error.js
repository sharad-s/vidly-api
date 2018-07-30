const winston = require("winston");

function error(err, req, res, next) {
  // Winston Error Logging of all express exceptions
  // All express exceptions will be caught here and be logged
  winston.error(err.message, err);
  res.status(500).send("Something failed.");
}

module.exports = error;
