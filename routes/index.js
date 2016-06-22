var express = require('express');
var router = express.Router();
var Db_dump = require('../models/db_dump');

module.exports = function(LocationSchema, ensureAuthenticated) {
  router.get('/', function(req, res) {
    res.render('index', { 
      title: 'KOMPAS',
      user: req.user
    })
  });
  router.get('/register', function(req, res) {
    res.render('register', { message: req.flash('signupMessage') });
  });
  router.get('/login', function(req, res){
    res.render('login', { 
      user: req.user,
      message: req.flash('loginMessage')
    })
  });
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  router.get('/data/dump', ensureAuthenticated, function(req, res) {
    Db_dump.importData(); // import csv location data
    var html = '<html>Dump data seeded, <a href="/">go back</a></html>'
    res.send(html);
  });

  return router;
}

