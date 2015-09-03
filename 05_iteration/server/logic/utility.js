var db = require("../database.js");


function handleGet(cb){
  db.beerLocation.find({}, function(err, items) {
    if (err) throw err;
    return cb(items);
  });
};

function handlePost(place, type, active){
  console.log("in ute");
  newLocation = new db.beerLocation({placeId: place,
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
  db.beerLocation.findOneAndUpdate(id, update, option, function(err, location){
    if (err) throw err;
    return cb(location);
  });
}

// accepts a Number
function handleDelete(currentId){
  db.beerLocation.remove({_id: currentId}, function(err){
    if(err) throw err;
  });
  return {message: "Location removed."};
};





module.exports = {
  handleGet: handleGet,
  handleDelete: handleDelete,
  handlePost: handlePost,
  handlePut: handlePut
}





