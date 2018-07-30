// Direct Imports
require("express-async-errors");

const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const winston = require("winston"); // Logging library
require("winston-mongodb");

// Joi input validation - add ObjectId validation
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// Winston transports
winston.add(winston.transports.File, {
  filename: "logfile.log",
  level: "silly"
});
winston.add(winston.transports.MongoDB, {
  db: "mongodb://localhost/vidly",
  level: "error"
});

// Custom middleware
const logger = require("./middleware/logger");
const error = require("./middleware/error");

// Import Routes
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

// Debuggers
const startupDebugger = require("debug")("app:startup");

// Instantiate express
const app = express();

// Node process Error logger
winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("unhandledRejection", ex => {
  throw ex;
});

// Check for jwtPrivateKey
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to Vidly Database..."))
  .catch(err => console.error(`Could not connect to Vidly... Error: ${err}`));

// Default Middleware
app.use(express.json());
app.use(helmet());
app.use(logger);

// Development Middleware
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled... Requests will be logged.");
}

// // Log Config Variables
// console.log("Application Name: " + config.get("name"));
// console.log("Mail Server: " + config.get("mail.host"));
// console.log("App Password: " + config.get("mail.password"));

// Setup Routes
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
