const winston = require("winston"); // Logging library
require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  // Winston transports
  winston.add(winston.transports.File, {
    filename: "./logs/logfile.log"
  });
  winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost/vidly"
  });

  // Node process Error logger
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "./logs/uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", ex => {
    throw ex;
  });
};
