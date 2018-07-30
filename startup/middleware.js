const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// Debuggers
const startupDebugger = require("debug")("app:startup");

module.exports = function(app) {
  // Default Middleware
  app.use(express.json());
  app.use(helmet());

  // Development Middleware
  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    startupDebugger("Morgan enabled... Requests will be logged.");
  }
};
