const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity")
const Movie = require("../models/movie")

const celebrities = [
    {
        name:"Tom Cruise",
        occupation:"Actor",
        catchphrase:"Aucune mission n'est impossible"},
    {
        name:"Beyonce",
        occupation:"Singer",
        catchphrase:"All the single ladies"},
    {
        name:"Daffy Duck",
        occupation:"Duck",
        catchphrase:"C'est la chasse aux canards"},
]


const movies = [
    {
        title:"Top Gun",
        genre:"Action",
        plot:"un jeune pilote intègre une école de pilotage",
        cast: ["Tom Cruise", "Val Kilmer"]},
    {
        title:"Daffy Duck",
        genre:"Duck",
        plot:"C'est la chasse aux canards",
        cast: ["Daffy Duck", "Bugs Bunny", "Pepe le Putois", "Porky"]},
]

mongoose
  .connect("mongodb://localhost/Celebrities-library")
  .then(function() {
    console.log('connected to the DB')
  })
  .then(function () {
    Celebrity.deleteMany()
        .then(()=> {
         console.log("celebrities cleaned");
        })
    })
  .then(function() {
    Movie.deleteMany()
        .then(()=> {
         console.log("movies cleaned");
        })
   })
  .then(function () {
    Celebrity.create(celebrities)
    Movie.create(movies)
        .then(()=>{
            console.log(`${celebrities.length} celebrities added to DB`)
            console.log(`${movies.length} movies added to DB`)
            mongoose.connection.close();
        })
        .catch(err=>{
            console.log('error:',err)
            next(err)
        })
  })
  .catch((err) => console.log("oops connecting", err));


