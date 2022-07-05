const mongoose = require("mongoose");
const Celebrities = require("../models/celebrity")
const celebrities = [
    {
        name:"Tom Cruise",
        occupation:"Actor",
        catchphrase:"Impossible n'est pas Francais",},
    {
        name:"Beyonce",
        occupation:"Singer",
        catchphrase:"All the single ladies",},
    {
        name:"Daffy Duck",
        occupation:"Duck",
        catchphrase:"C'est la chasse aux canards"},
]

mongoose
  .connect("mongodb://localhost/Celebrities")
  .then(function () {
    console.log("connected to the DB");
    return Celebrities.deleteMany() 
  })
  .catch((err) => console.log("oops connecting", err));


Celebrities.create(celebrities)
    .then(()=>{
        console.log('celebrities added to DB')
        mongoose.connection.close();
    })
    .catch(err=>{
        console.log('error:',err)
        next(err)
    })