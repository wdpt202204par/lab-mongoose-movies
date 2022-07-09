const express = require("express");
const router = express.Router();
const Celebrities = require("../models/Celebrity.model");
const Movies = require("../models/Movie.model");

router.get("/new", (req, res, next) => {
  Celebrities.find()
    .then((CelebritiesFromDB) => {
      res.render("movies/new", {
        CelebritiesData: CelebritiesFromDB,
      });
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  Movies.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  });
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

module.exports = router;
