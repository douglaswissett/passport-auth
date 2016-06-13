var express = require('express');
var router = express.Router();

var Account = require('../models/account');
/* GET users listing. */
router.get('/', function(req, res, next) {

  Account.findAll(function(err, users){
    res.render('show_users.jade', { data: users, title: 'Users', description: 'kompas_test userbase' });
  });
});

router.get('/json', function(req, res, next) {
  Account.findAll(function(err, users) {
    res.json(users);
  });
});

module.exports = router;
