var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InterestSchema   = new Schema({
  name: String,
  category: String,
  sub_category: String,
  photo_link: String
});

module.exports = mongoose.model('InterestSchema', InterestSchema);
