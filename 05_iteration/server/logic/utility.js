var db = require("../database.js");


// need to create success or error messages

function handlePost(place, type, active){
  console.log("in ute");
  newLocation = new db.location({placeId: place,
                                  type: type,
                                  active: active
                                 });

  console.log(newLocation);
  newLocation.save(function(err) {
    if (err) throw err;
    });
  return newLocation;
};

// update = object of changes
function handlePut(id, update, option, cb){
  BeerLocation.findOneAndUpdate(id, update, option, function(err, location){
    if (err) throw err;
    return cb(location);
  });
}

// accepts a Number
function handleDelete(currentId){
  Item.remove({_id: currentId}, function(err){
    if(err) throw err;
  });
  return {message: "Location removed."};
};




function handleGet(cb){
  Item.find({}, function(err, items) {
    if (err) throw err;
    return cb(items);
  });
};

module.exports = {
  handleGet: handleGet,
  handleDelete: handleDelete,
  handlePost: handlePost,
  handlePut: handlePut
}





