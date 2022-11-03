const mongoose = require('mongoose')


const celebSchema = new mongoose.Schema({
  name: String,
  occupation: String,
  catchphrase: String,
  // created_at: 
  // updated_at: 
}, {
  timestamps: true
})

module.exports = mongoose.model('Celebrity', celebSchema)