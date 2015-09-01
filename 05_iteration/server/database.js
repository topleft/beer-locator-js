var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var Admin = new Schema({
  username: String,
  password: String
});

var Location = new Schema({
  name: String, // place.name
  placeId: String, // place._id
  type: String, // bar, restaruant, liquor store
  active: Boolean
})

Admin.plugin(passportLocalMongoose);

var admin = mongoose.model('admins', Admin)
var location = mongoose.model('locations', Location);

module.exports = {
  admin: admin,
  location: location
}

mongoose.connect('mongodb://localhost/beer-locator-database');
