var express = require('express');
var router = express.Router();

/* GET urlCoverter page. */
router.get('/', function (req, res, next) {
    res.render('urlConverter');
});

module.exports = router;