const mongoose = require('mongoose')


const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  plot: String,
  cast : [{type: mongoose.Schema.Types.ObjectId, ref:'Celebrity'}] // je récupère le nom des célébrités en prenant le Schema Celebrity : vérifier si correct
}, {
  timestamps: true
})

module.exports = mongoose.model('Movie', movieSchema)