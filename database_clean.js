var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Review = require("./models/comment");

function databaseClean(){
    Campground.deleteMany({}, function(err){
    });
}

module.exports = databaseClean;