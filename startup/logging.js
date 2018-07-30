const winston = require("winston"); // Logging library
require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  // Adding winston transports for all exceptions.
  winston.add(winston.transports.File, {
    filename: "./logs/logfile.log"
  });
  winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost/vidly"
  });

  // Winston Error Logging for all node processes
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "./logs/uncaughtExceptions.log" })
  );

  // Throw exceptions for every unhandled Promise Rejection
  process.on("unhandledRejection", ex => {
    throw ex;
  });
};
