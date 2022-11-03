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

router.post('/:id/delete',(req,res,next)=>{
    Celebrity.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.redirect('/celebrities')
        })
        .catch(err=>{
            console.log('error deleting celebrity',err)
            next(err)
        })
})

router.get('/:id/edit',(req,res,next)=>{
    Celebrity.findById(req.params.id)
        .then((celebrityFromDB)=>{
            console.log(celebrityFromDB)
            res.render('celebrities/edit',{celebrity:celebrityFromDB})
        })
        .catch((err)=>{
            console.log('error accessing celebrity edition',err)
            next(err)
        })
})

router.post('/:id/edit',(req,res,next)=>{
    Celebrity.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        occupation:req.body.occupation,
        catchphrase:req.body.catchphrase,
    },
    {new:true})
        .then((celebrityFromDB)=>{
            res.redirect(`/celebrities/${celebrityFromDB._id}`)
        })
        .catch((err)=>{
            console.log('error editing celebrity',err)
            next(err)
        })
})


module.exports = router;