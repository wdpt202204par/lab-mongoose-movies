const express = require("express");
const router = express.Router();
const Mongoose = require("mongoose");
const Celebrities = require("../models/Celebrity.model");
let celebritiesData;

/* GET home page */
router.get("/", (req, res, next) => {
  Celebrities.find()
    .then((CelebritiesFromDB) => {
      celebritiesData = CelebritiesFromDB;
      res.render("celebrities/index", {
        data: celebritiesData,
      });
    })
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  Celebrities.findById()
    .then((CelebritiesFromDB) => {
      res.render("celebrities/show", {
        data: CelebritiesFromDB,
      });
    })

    .catch((err) => next(err));
});

module.exports = router;
