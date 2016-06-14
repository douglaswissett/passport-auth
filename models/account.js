var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    ig_id: String
});

Account.statics.findAll = function (cb) {
  return this.find({}, cb);
}

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);