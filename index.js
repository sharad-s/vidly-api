// Direct Imports
const express = require("express");
const winston = require("winston");

// Instantiate express
const app = express();

require("./startup/logging")();
require("./startup/middleware")(app);
require("./startup/config")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

// PORT
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
