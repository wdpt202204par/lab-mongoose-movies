const express = require("express");
const router = express.Router();
const Mongoose = require("mongoose");
const Celebrities = require("../models/Celebrity.model");
let celebritiesData;

/* GET home page */
router.get("/", (req, res, next) => {
  Celebrities.find()
    .then((CelebritiesFromDB) => {
      res.render("celebrities/index", {
        data: CelebritiesFromDB,
      });
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  Celebrities.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  })
    .then(function () {
      res.redirect("/celebrities");
    })
    .catch((err) => next(err));
});

router.get("/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.get("/:id", (req, res, next) => {
  Celebrities.findById(req.params.id)
    .then((CelebritiesFromDB) => {
      res.render("celebrities/show", {
        data: CelebritiesFromDB,
      });
    })
    .catch((err) => next(err));
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  Celebrities.findByIdAndRemove(req.params.id)
    .then(function () {
      res.redirect("/celebrities");
    })
    .catch((err) => next(err));
});

module.exports = router;
