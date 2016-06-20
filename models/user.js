var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  ig_id: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
