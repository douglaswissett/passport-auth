var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
  username     : String,
  password     : String,
  instagram_id : String
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// userSchema.plugin(passportLocalMongoose);

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
