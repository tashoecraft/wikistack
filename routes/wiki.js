var express = require('express');
var router = express.Router();

var models = require('../models/');

var Page = models.Page;
var User = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  var page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  page.save()
  .then(function(savePage){
    res.redirect(savePage.route);
  })
  .then(function(err) {
    console.log(err);
  });
});

router.get('/add/', function(req, res, next) {
  res.render('addpage');
});

router.get('/:url', function(req, res, next) {
  Page.findOne({urlTitle: req.params.url}).exec()
  .then(function(foundPage) {
    //res.send(foundPage);
    res.render('wikipage', {title: foundPage.title, content: foundPage.content, urlTitle: foundPage.urlTitle});
  });
});


module.exports = router;
