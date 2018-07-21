const express = require("express");
const router = express.Router();

// GET all courses
router.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = router;
