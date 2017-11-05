var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/aboutus', (req, res, next) => {
  res.render('about')
})

router.get('/contactus', (req, res, next) => {
  res.render('contactus')
})
module.exports = router;