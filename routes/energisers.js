const express = require("express");
const router = express.Router();
const Energiser = require("../db/models/energiser");

//Get all
router.get("/", async (req, res) => {
  try {
    const energisers = await Energiser.find();
    res.json(energisers);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Get one
router.get("/:id", getEnergiserById, (req, res) => {
  res.send(res.energiser);
});

//Create one
router.post("/", async (req, res) => {
  const {
    title,
    minPlayers,
    stepByStep,
    videoUrl,
    images,
    canBeRemote,
    estimatedTime,
    resourcesNeeded,
    category,
    outcomes,
    rating,
  } = req.body;
  const energiser = new Energiser({
    title,
    minPlayers,
    stepByStep,
    videoUrl,
    images,
    canBeRemote,
    estimatedTime,
    resourcesNeeded,
    category,
    outcomes,
    rating,
  });
  try {
    const newEnergiser = await energiser.save();
    res.status(201).json(newEnergiser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update One
router.patch("/:id", getEnergiserById, async (req, res) => {
  if (req.body.title !== null) {
    res.energiser.title = req.body.title;
  }
  if (req.body.stepByStep !== null) {
    res.energiser.stepByStep = req.body.stepByStep;
  }
  if (req.body.videoUrl !== null) {
    res.energiser.videoUrl = req.body.videoUrl;
  }
  if (req.body.resourcesNeeded !== null) {
    res.energiser.resourcesNeeded = req.body.resourcesNeeded;
  }
  if (req.body.canBeRemote !== null) {
    res.energiser.canBeRemote = req.body.canBeRemote;
  }
  if (req.body.estimatedTime !== null) {
    res.energiser.estimatedTime = req.body.estimatedTime;
  }
  if (req.body.category !== null) {
    res.energiser.category = req.body.category;
  }
  if (req.body.outcomes !== null) {
    res.energiser.outcomes = req.body.outcomes;
  }
  if (req.body.minPlayers !== null) {
    res.energiser.minPlayers = req.body.minPlayers;
  }
  if (req.body.images !== null) {
    res.energiser.images = req.body.images;
  }
  if (req.body.rating !== null) {
    res.energiser.rating = req.body.rating;
  }

  try {
    const updatedEnergiser = await res.energiser.save();
    res.json(updatedEnergiser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one
router.delete("/:id", getEnergiserById, async (req, res) => {
  try {
    await res.energiser.remove();
    res.json({ message: `deleted ${res.energiser}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getEnergiserById(req, res, next) {
  let energiser;
  try {
    energiser = await Energiser.findById(req.params.id);
    if (energiser == null) {
      return res.status(404).json({ message: "Can't find that resource" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.energiser = energiser;
  next();
}

module.exports = router;
