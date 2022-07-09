const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Celebrity" }],
});

const Movie = mongoose.model("Movie", schema);

module.exports = Movie;
