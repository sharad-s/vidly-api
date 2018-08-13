/*
  Route: /api/genres

*/
const { Genre, validate } = require("../models/genre");

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Middleware
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");

// @route   GET api/genres
// @desc    Get genres
// @access  Public
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");

  res.send(genres);
});

// GET course by id
router.get("/:id", validateObjectId, async (req, res) => {

    // Find genre by id
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).send("The genre with the given ID was not found.");
    }
    res.send(genre);

});

// POST new genre
router.post("/", auth, async (req, res) => {
  // Validate course
  const { error } = validate(req.body);

  // If validation fails, return 400 - Bad Request
  if (error) return res.status(400).send(error.details[0].message);

  // Create new genre object
  const genre = new Genre({ name: req.body.name });

  // Save genre object to DB
  await genre.save();
  res.send(genre);
});

// PUT update existing course
router.put("/:id", async (req, res) => {

  // Validate course. If fail - return 400 - Bad Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find Course by id and update (Update first method)
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );

  // If not existing, return 404
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  // If course not found - return return 404
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
