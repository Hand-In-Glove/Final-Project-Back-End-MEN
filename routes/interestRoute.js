const express = require("express");
const interestRouter = express.Router();
const Interest = require("../db/models/interest");

//Get all
interestRouter.get("/", async (req, res) => {
  try {
    const interests = await Interest.find();
    res.json(interests);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Create one
interestRouter.post("/", async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const interest = new Interest({
    email,
  });
  try {
    const newInterest = await interest.save();
    res.status(201).json(newInterest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete one
interestRouter.delete("/", async (req, res) => {
  const { email } = req.body;
  try {
    await Interest.deleteOne({ email });
    res.json({ message: `deleted ${email}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = interestRouter;
