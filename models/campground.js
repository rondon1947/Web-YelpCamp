var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String, 
    image: String,
    description: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;