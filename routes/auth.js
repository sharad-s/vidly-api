/*
  Route: /api/genres

*/

const { User } = require("../models/user");

const _ = require("lodash");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// POST new user
router.post("/", async (req, res) => {
  // Validate input parameters.  If validation fails, return 400 - Bad Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Validate email exists
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  // Validate password match
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  // Generate jwt
  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(token);
});

// Custom validation for client auth input
function validate(req) {
  // Validate Course
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(req, schema);
}

module.exports = router;
