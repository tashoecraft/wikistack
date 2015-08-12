var express = require('express');
var router = express.Router();
var models = require('../models/');
var User = models.User;
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().exec().then(function(users) {
    //res.json(users);
    res.render('users', {users: users});
  });
});


module.exports = router;
