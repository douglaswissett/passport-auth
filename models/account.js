var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    username: String,
    ig_id: String
});

module.exports = mongoose.model('Account', Account);