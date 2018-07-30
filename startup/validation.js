const Joi = require("joi");

module.exports = function() {
  // Joi input validation - add ObjectId validation
  Joi.objectId = require("joi-objectid")(Joi);
};
