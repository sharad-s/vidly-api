/*
  Route: /api/customers

*/
const { Customer, validate } = require("../models/customer");

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// GET all genres
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// GET course by id
router.get("/:id", async (req, res) => {
  try {
    // Find genre by id
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch (err) {
    return res.status(404).send("The genre with the given ID was not found.");
  }
});

// POST new genre
router.post("/", async (req, res) => {
  // Validate course
  const { error } = validate(req.body);

  // If validation fails, return 400 - Bad Request
  if (error) return res.status(400).send(error.details[0].message);

  // Create new genre object
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  // Save genre object to DB
  customer = await customer.save();
  res.send(customer);
});

module.exports = router;
