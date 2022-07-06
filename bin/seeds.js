const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model")

mongoose
  .connect('mongodb://0.0.0.0/starter-code', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
  

data = [
{
    name: "Jamie Foxx",
    occupation: "Actor",
    catchPhrase: `If I fail as Jamie Foxx, I'll just change my name and come back as something else.`
},
{
    name: "Buzz l'eclair",
    occupation: "Toy",
    catchPhrase: `Vers l'infini et l'au dela`
},
{
    name: "Steve Urkel",
    occupation: "Actor",
    catchPhrase: `C'est moi qu'ai fait ça ?`
}
]

Celebrity.create(data)
.then(CelebrityFromDB=>{
    console.log("Creation Reussi")
})
.catch(err => console.log("Erreur de creation :", err))