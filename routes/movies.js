const express = require('express');
const router = express.Router();
const Movie = require('../models/movie')


router.get('/', (req, res, next) => {
    Movie.find()
        .then(function (moviesFromDB) {
            console.log('moviesFromDB:', moviesFromDB);
            res.render('movies/index', { movies: moviesFromDB });
        })
        .catch(err => {
            console.log(err);
            next(err);
        })

})

router.get('/new', (req, res, next) => { // attention car la route new est déjà utilisée par celebrity.js voir si conflit !
    res.render('movies/new', {})
})


router.post('/new', (req, res, next) => {
    const title = req.body.title
    const genre = req.body.genre
    const plot = req.body.plot
    const cast = req.body.cast
    console.log(title, genre, plot, cast)

    const newMovie =  new Movie({
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    })

    newMovie.save()
    .then((newMovie) => {
        console.log('un nouveau film vient d\'être ajouté à la dataBase', newMovie)
        res.redirect("/movies")
    })
    .catch(err => {
        console.log("problème à la création du film", err)
        res.render('movies/new',{})
        next(err)
    })
})



router.get('/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .then(function (movieFromDB) {
            console.log("movieFromDB=", movieFromDB);
            res.render("movies/show", { movie: movieFromDB, });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
})

router.post('/:id/delete',(req,res,next)=>{
    Movie.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.redirect('/ùovies')
        })
        .catch(err=>{
            console.log('error deleting ùovie',err)
            next(err)
        })
})

router.get('/:id/edit',(req,res,next)=>{
    Movie.findById(req.params.id)
        .then((movieFromDB)=>{
            console.log(movieFromDB)
            res.render('movies/edit',{movie:movieFromDB})
        })
        .catch((err)=>{
            console.log('error accessing movie edition',err)
            next(err)
        })
})

router.post('/:id/edit',(req,res,next)=>{
    Movie.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        genre:req.body.genre,
        plot:req.body.plot,
        cast:req.body.cast
    },
    {new:true})
        .then((movieFromDB)=>{
            res.redirect(`/movies/${movieFromDB._id}`)
        })
        .catch((err)=>{
            console.log('error editing movie',err)
            next(err)
        })
})

module.exports = router;