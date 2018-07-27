/*
  Route: /api/movies

*/
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// GET all genres
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

// GET movie by id
router.get("/:id", async (req, res) => {
  try {
    // Find genre by id
    const movie = await Movie.findById(req.params.id).populate("genre");
    res.send(movie);
  } catch (err) {
    return res.status(404).send("The movie with the given ID was not found.");
  }
});

// POST new movie
router.post("/", async (req, res) => {
  // Validate movie input. If validation fails, return 400 - Bad Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Validate movie's genre. If input genre does not exist, return 400 - Bad Request
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  // Create new movie object
  // Selectively choose which properties of the client object to add to the database
  // Hybrid Approach to referencing genre
  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  // Save genre object to DB
  movie = await movie.save();
  res.send(movie);
});

module.exports = router;
