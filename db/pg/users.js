'use strict';
const pgp = require('pg-promise')({});


var cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};



const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const db = pgp(cn)

function createSecure(email, password, callback) {
    bcrypt.genSalt(function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash){
        callback(email, hash)
      })
    })
  }


function createUser(req, res, next) {
  createSecure(req.body.email, req.body.password, saveUser)

      function saveUser(email, hash) {
        db.none(`INSERT INTO users (email, password_hash, age, gender, weight, height)
        VALUES ($1, $2, $3, $4, $5, $6)`,
            [email, hash, req.body.age, req.body.gender, req.body.weight, req.body.height])
            .then(next)
            .catch((err) => {
              console.log('error signing up', err.message || err);
              res.rows = err.code
              next();
            })
      }
    }

function login(req, res, next) {
  var email = req.body.email
  var password = req.body.password

  db.one(`SELECT * FROM users WHERE email LIKE $/email/`, req.body)
    .then((data) => {
      console.log(data)
        if (bcrypt.compareSync(password, data.password_hash)) {
          res.rows = data;
          next();
        }
        res.status(401).json({data: "password and email do not match"})
      })
      .catch((err) => {
        console.error(err, 'error finding user')
      })
}

module.exports.login = login;
module.exports.createUser = createUser;
