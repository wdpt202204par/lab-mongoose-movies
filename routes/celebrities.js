const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity')


router.get('/', (req, res, next) => {
    Celebrity.find()
        .then(function (celebritiesFromDB) {
            console.log('celebritiesFromDB:', celebritiesFromDB);
            res.render('celebrities/index', { celebrities : celebritiesFromDB });
        })
        .catch(err => {
            console.log(err);
            next(err);
        })

})

router.get('/:id',(req,res,next)=>{
    Celebrity.findById(req.params.id)
    .then(function (celebrityFromDB) {
        console.log("celebrityFromDB=", celebrityFromDB);
        res.render("celebrities/show", {celebrity: celebrityFromDB,});
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
})

module.exports = router;