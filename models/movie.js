const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

// Instantiate Genre class
const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true, // get rid of padding
      minlength: 5,
      maxlength: 255
    },
    genre: {
      type: genreSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    }
  })
);

// Joi returns either result or error
// Mongoose schema can grow independent of the mongoose Schema
// Joi = client input ; Mongoose = whole object
function validateMovie(movie) {
  // Validate Course
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    genreId: Joi.objectId().required(), // client should send only genre ID
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required()
  };
  return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
