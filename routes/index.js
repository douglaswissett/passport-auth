var express = require('express');
var router = express.Router();
var Db_dump = require('../models/db_dump');

module.exports = function(LocationSchema, ensureAuthenticated) {
  /* GET home page. */
  router.get('/', function(req, res) {

    console.log('TEST USER: ', req.user);

    res.render('index', { 
      title: 'KOMPAS Server',
      user: req.user
    });
  });

  router.get('/register', function(req, res) {
      res.render('register', { message: req.flash('signupMessage') });
  });

  router.get('/login', function(req, res){
    res.render('login', { 
      user: req.user,
      message: req.flash('loginMessage')
    });
  });

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // convert dump data into geo index data
  router.get('/data/dump', ensureAuthenticated, function(req, res) {
    // import csv formatted to json 2dindex
    Db_dump.importData();
    // send home link
    var html = '<html>Dump data seeded, <a href="/">go back</a></html>'
    res.send(html);
  });

  return router;
}

