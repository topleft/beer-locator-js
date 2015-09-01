var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var Admin = new Schema({
  username: String,
  password: String
});

var Location = new Schema({
  name: String,
  placeId: String,
  type: String
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('admins', Admin);
module.exports = mongoose.model('locations', Location);