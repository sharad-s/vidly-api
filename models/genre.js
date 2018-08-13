const mongoose = require("mongoose");
const Joi = require("joi");

// Schema can be re-used in multiple place
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

// Instantiate Genre class
const Genre = mongoose.model("Genre", genreSchema);

// Joi returns either result or error
function validateGenre(course) {
  // Validate Course
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  };
  return Joi.validate(course, schema);
}

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validate = validateGenre;
