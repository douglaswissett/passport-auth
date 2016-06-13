var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    username: String,
    ig_id: String
});

Account.statics.findAll = function (cb) {
  return this.find({}, cb);
}

module.exports = mongoose.model('Account', Account);