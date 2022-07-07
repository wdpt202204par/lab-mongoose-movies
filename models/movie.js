const mongoose = require('mongoose')


const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  plot: String,
  cast : [String] // je récupère le nom des célébrités en prenant le Schema Celebrity
}, {
  timestamps: true
})

module.exports = mongoose.model('Movie', movieSchema)