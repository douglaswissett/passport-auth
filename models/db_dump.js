var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Db_dump = new Schema({
  name: String,
  location: String,
  city: String,
  latitude: Number,
  longitude: Number,
  related_ids: Number,
  description: String,
  meta_tags: String,
  photo_link: String
}, { collection : 'db_dump' });   

module.exports = mongoose.model('Db_dump', Db_dump);
