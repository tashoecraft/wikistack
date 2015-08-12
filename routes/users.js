var express = require('express');
var router = express.Router();
var models = require('../models/');
var Promise = require('bluebird');
var marked = require('marked');

var Page = models.Page;
var User = models.User;
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().exec().then(function(users) {
    //res.json(users);
    res.render('users', {users: users});
  });
});

// display the user's name, email, and a list of all pages that user has authored (with links to the pages)
router.get('/:userid', function(req, res, next) {
    Promise.join(User.findOne({_id: req.params.userid}).exec(), Page.find({author: req.params.userid}).exec(), function(userFound, pageFound) {
            // console.log(userFound);
            // res.json(pageFound);
            res.render('profiles', {
                name: userFound.name,
                email: userFound.email,
                pages: pageFound 
            });
    });
});



module.exports = router;
