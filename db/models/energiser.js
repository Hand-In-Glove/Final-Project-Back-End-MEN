const mongoose = require("mongoose");

const energiserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  minPlayers: { type: Number },
  stepByStep: { type: Array, required: true },
  videoUrl: { type: String },
  images: { type: Array },
  canBeRemote: { type: Boolean },
  estimatedTime: { type: Number },
  resourcesNeeded: { type: Array },
  category: { type: Array },
  outcomes: { type: Array },
});

module.exports = mongoose.model("Energiser", energiserSchema);
