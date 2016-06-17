var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  ig_id: String,
  coordinates: [Number]
});

User.statics.findAll = function (cb) {
  return this.find({}, cb);
}

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);