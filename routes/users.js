var express = require('express');
var router = express.Router();
const http = require('http');
var bodyParser = require('body-parser');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


var options = {
  host: 'www.bbc.com',
  port: 80,
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
    const dom = new JSDOM(str);
    const listOfImages = dom.window.document.querySelectorAll("img");
    for (i = 0; i < listOfImages.length; i++) {
      console.log(listOfImages[i].getAttribute("src"));
    }
  });
}

http.request(options, callback).end();

module.exports = router;
