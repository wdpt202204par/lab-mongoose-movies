const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity')


router.get('/', (req, res, next) => {
    Celebrity.find()
        .then(function (celebritiesFromDB) {
            console.log('celebritiesFromDB:', celebritiesFromDB);
            res.render('celebrities/index', { celebrities: celebritiesFromDB });
        })
        .catch(err => {
            console.log(err);
            next(err);
        })

})

router.get('/new', (req, res, next) => {
    res.render('celebrities/new', {})
})

router.post('/new', (req, res, next) => {
    const name = req.body.name
    const occupation = req.body.occupation
    const catchphrase = req.body.catchphrase
    console.log(name, occupation, catchphrase)

    const newCeleb =  new Celebrity({
        name: name,
        occupation: occupation,
        catchphrase: catchphrase
    })

    newCeleb.save()
    .then((newCelebrity) => {
        console.log('nouvelle célébrité ajoutée à la DB', newCelebrity)
        res.redirect("/celebrities")
    })
    .catch(err => {
        console.log("problème à la création d'une célébrité", err)
        res.render('celebrities/new',{})
        next(err)
    })

    // Celebrity.create({
    //     name: name,
    //     occupation: occupation,
    //     catchphrase: catchphrase
    // })
    //     .then((newCeleb) => {
    //         console.log('nouvelle célébrité ajoutée à la DB', newCeleb)
    //         res.redirect("/celebrities")
    //     })
    //     .catch(err => {
    //         console.log("problème à la création d'une célébrité", err)
    //         res.render('celebrities/new',{})
    //         next(err)
    //     })

})








router.get('/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(function (celebrityFromDB) {
            console.log("celebrityFromDB=", celebrityFromDB);
            res.render("celebrities/show", { celebrity: celebrityFromDB, });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
})




module.exports = router;