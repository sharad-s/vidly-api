/*
  Route: /api/rentals

*/

const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Genre } = require("../models/genre");

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// GET all genres
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("name");
  res.send(rentals);
});

// // GET movie by id
// router.get("/:id", async (req, res) => {
//   try {
//     // Find genre by id
//     const movie = await Movie.findById(req.params.id).populate("genre");
//     res.send(movie);
//   } catch (err) {
//     return res.status(404).send("The movie with the given ID was not found.");
//   }
// });

// POST new movie
router.post("/", async (req, res) => {
  // Validate rental input. If validation fails, return 400 - Bad Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Validate the Rental's customer property. If customer does not exist, return 400 - Bad Request
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  // Validate the Rental's movie property. If movie does not exist, return 400 - Bad Request
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie Not in Stock");

  // Create new movie object
  // Selectively choose which properties of the client object to add to the database
  // Hybrid Approach to referencing genre
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title
    }
  });

  // Save genre object to DB
  movie = await movie.save();
  res.send(movie);
});

module.exports = router;
