var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema   = new Schema({
  name: String,
  geo: {
    type: [Number],
    index: '2d'
  }
});

module.exports = mongoose.model('LocationSchema', LocationSchema);
