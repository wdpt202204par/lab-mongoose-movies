const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity")
const celebrities = [
    {
        name:"Tom Cruise",
        occupation:"Actor",
        catchphrase:"Aucune mission n'est impossible",},
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
  .connect("mongodb://localhost/Celebrities-library")
  .then(function () {
    console.log("connected to the DB");
    console.log('cleaning DB')
    return Celebrity.deleteMany() 
  })
  .catch((err) => console.log("oops connecting", err));


Celebrity.create(celebrities)
    .then(()=>{
        console.log(`${celebrities.length} celebrities added to DB`)
        mongoose.connection.close();
    })
    .catch(err=>{
        console.log('error:',err)
        next(err)
    })