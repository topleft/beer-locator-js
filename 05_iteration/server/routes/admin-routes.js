var express = require('express');
var router = express.Router();
var Admin = require("../database.js");
var BeerLocation = require("../database.js");
var ute = require("../logic/utility.js");



router.get('/', function(req, res, next) {

  res.render('admin', { title: 'Kannah Creek Brewing Co.' });
});

router.get('/hasKannah', function(req, res, next) {
  ute.handleGet(function(data){
    console.log(data);
    res.json(data);
  });
});

router.get('/hasKannah/:placeId', function(req, res, next) {
  ute.handleGetOne(req.params.placeId, function(data){
    res.json(data);
  });
});


router.post("/", function(req, res){
  console.log("in router");
  var response = ute.handlePost(req.body.placeId, req.body.type, req.body.active);
  console.log(response);
  res.json(response);
});

router.put("/:id", function(req, res){
  var query = {"_id": req.params.id};
  var update = {category: req.body.category};
  var option = {new: true};
  ute.handlePut(query, update, option, function(item){
    res.json(item);
  });
});


router.delete('/:id', function(req, res){
  var response = ute.handleDelete(req.params.id);
  console.log(response)
  res.json(response)
});



module.exports = router;
