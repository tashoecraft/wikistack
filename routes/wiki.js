var express = require('express');
var router = express.Router();
var marked = require('marked');

var models = require('../models/');
var Promise = require('bluebird');

var Page = models.Page;
var User = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  Page.find().exec().then(function(pages) {
    // res.json(pages);
    res.render('index', {pages: pages});
  });
});

router.post('/', function(req, res, next) {
  var page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

User.findOrCreate(req.body).then(function(user) {
    page.author = user._id;
    return page.save();
  })
  .then(function(savePage){
    res.redirect(savePage.route);
  })
  .then(null, next
  );
});

router.get('/add/', function(req, res, next) {
  res.render('addpage');
});

router.get('/:url', function(req, res, next) {
  Page.findOne({urlTitle: req.params.url}).exec()
  .then(function(foundPage) {
    User.findOne({_id: foundPage.author})
      .then(function(foundUser) {
        console.log(foundUser);
        console.log(foundPage);
        res.render('wikipage', {title: foundPage.title, content: foundPage.content, urlTitle: foundPage.urlTitle, author: foundUser.name, userid: foundUser._id});
      });
  });
});


module.exports = router;
