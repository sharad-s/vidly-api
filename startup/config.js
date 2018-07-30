const config = require("config");

module.exports = function() {
  // Check for jwtPrivateKey
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
