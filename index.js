// Direct Imports
const express = require("express");
const winston = require("winston");

// Instantiate express
const app = express();

// // Log Config Variables
// console.log("Application Name: " + config.get("name"));
// console.log("Mail Server: " + config.get("mail.host"));
// console.log("App Password: " + config.get("mail.password"));

require("./startup/logging")();
require("./startup/middleware")(app);
require("./startup/config")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
