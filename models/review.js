var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    text: String, 
    author: String
});

var Review = mongoose.model("Review", reviewSchema);

module.exports = Review;