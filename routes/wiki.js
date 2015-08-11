var express = require('express');
var router = express.Router();

var models = require('../models/');
var Page = models.Page;
var User = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("got wiki");
});

router.post('/', function(req, res, next) {
  var page = new Page({
    'title': title,
    'urlTitle': urlTitle,
    'content': content
  });

  page.save()
  .then(function(){
    res.redirect('/');
  })
  .then(function(err) {
    console.log(err);
  });
});

router.get('/add/', function(req, res, next) {
  res.render('../views/addpage.html', {

  });
});
  

module.exports = router;
