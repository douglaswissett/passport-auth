var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema   = new Schema({
  name: String,
  location: String,
  City: String,
  geo: {
    type: [Number],
    index: '2d'
  },
  latitude: Number,
  longitude: Number,
  related_ids: Number,
  description: String,
  meta_tags: String,
  photo_link: String
});

module.exports = mongoose.model('LocationSchema', LocationSchema);
