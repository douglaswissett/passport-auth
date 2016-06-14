var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {

  User.findAll(function(err, users){
    res.render('show_users.jade', { data: users, title: 'Users', description: 'kompas_test userbase' });
  });
});

router.get('/json', function(req, res, next) {
  User.findAll(function(err, users) {
    res.json(users);
  });
});

module.exports = router;
