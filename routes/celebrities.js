const express       = require('express');
const router        = express.Router();
const Mongoose      = require('mongoose');
const Celebrities   = require('../models/Celebrity.model')
let celebritiesData

/* GET home page */
router.get('/', (req, res, next) => {

    Celebrities.find()
    .then(CelebritiesFromDB =>{
        celebritiesData = CelebritiesFromDB
    })
    .catch(err => next(err))
    res.render('celebrities/index',{
        data : celebritiesData
  });
});



module.exports = router;