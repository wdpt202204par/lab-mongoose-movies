const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name:           String,
    occupation:     String,
    catchPhrase :   String,
});

const Celebrity = mongoose.model("Celebrity", schema);

module.exports = Celebrity;