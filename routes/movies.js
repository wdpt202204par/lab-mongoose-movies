const express = require("express");
const router = express.Router();
const Celebrities = require("../models/Celebrity.model");
const Movies = require("../models/Movie.model");

router.post("/", (req, res, next) => {
  Movies.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});

router.get("/", (req, res, next) => {
  Movies.find()
    .then((MoviesFromDB) => {
      res.render("movies/index", {
        MoviesData: MoviesFromDB,
      });
    })
    .catch((err) => next(err));
});

router.get("/new", (req, res, next) => {
  Celebrities.find()
    .then((CelebritiesFromDB) => {
      res.render("movies/new", {
        CelebritiesData: CelebritiesFromDB,
      });
    })
    .catch((err) => next(err));
});

router.post("/:id", (req, res, next) => {
    Movies.findByIdAndUpdate(req.params.id, {
        title : req.body.title,
        genre : req.body.genre,
        plot : req.body.plot,
        cast : req.body.cast
    })
      .then(() => {
        res.redirect("/movies")
      })
      .catch((err) => next(err));
  });

  router.get("/:id", (req, res, next) => {
    Movies.findById(req.params.id)
      .populate("cast")
      .then((MovieFromDB) => {
        console.log(MovieFromDB);
        res.render("movies/show", {
          MovieData: MovieFromDB,
        });
      })
      .catch((err) => next(err));
  });

router.post("/:id/delete", (req, res, next) => {
  Movies.findByIdAndRemove(req.params.id)
    .then(function () {
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});

router.get("/:id/edit", (req, res, next) => {
    Movies.findById(req.params.id)
      .populate("cast")
      .then(MovieFromDB => {
        res.render("movies/edit", {
            MovieData : MovieFromDB
        })
      })
      .catch((err) => next(err));
  });

module.exports = router;
