var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var Admin = new Schema({
  username: String,
  password: String
});

var BeerLocation = new Schema({
  placeId: String, // google place object
  type: String, // bar, restaruant, liquor store
  active: Boolean
});

// Admin.plugin(passportLocalMongoose);

var admin = mongoose.model('admins', Admin)
var beerLocation = mongoose.model('locations', BeerLocation);

module.exports = {
  admin: admin,
  beerLocation: beerLocation
}

mongoose.connect('mongodb://localhost/beer-locator');




