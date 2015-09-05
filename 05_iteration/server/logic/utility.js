var db = require("../database.js");


function handleGet(cb){
  // console.log("in ute");
  db.beerLocation.find({}, function(err, items) {
    if (err) throw err;
    // console.log("items :"+items)
    return cb(items);
  });
};

function handleGetOne(id, cb){
  db.beerLocation.find({placeId: id}, function(err, item) {
    if (err) throw err;
    return cb(item);
  });
};


function handlePost(place, type, active){
  newLocation =
    new db.beerLocation(
      {placeId: place,
       type: type,
       active: active
        });

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
  handleGetOne: handleGetOne,
  handleDelete: handleDelete,
  handlePost: handlePost,
  handlePut: handlePut

}





