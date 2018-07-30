const winston = require("winston");

function error(err, req, res, next) {
  winston.error(err.message, err);
  // Log exception
  console.log(err);
  res.status(500).send("Something failed.");
}

module.exports = error;
