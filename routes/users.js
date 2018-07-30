/*
  Route: /api/genres

*/

const { User, validate } = require("../models/user");

const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Middleware
const auth = require("../middleware/auth");

// GET all users
router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

// GET current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// POST new user
router.post("/", async (req, res) => {
  // Validate course.  If validation fails, return 400 - Bad Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  // Create new genre object
  // Using lodash pick method to grab params from the body
  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));

  // Hash and Salt the input password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // Save genre object to DB
  await user.save();

  // Sign JWT payload with secret key and set request header with JWT
  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
