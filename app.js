var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Review = require("./models/review")
var seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelpcamp", { useUnifiedTopology: true, useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgroundsData: allCampgrounds});    
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, newlyCreatedGround){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("reviews").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

app.get("/campgrounds/:id/reviews/new", function(req, res){
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("reviews/new", {campground: foundCampground});
    });
});

app.post("/campgrounds/:id/reviews", function (req, res){
    Campground.findById(req.params.id, function (err, foundCampground) {
        Review.create(req.body.review, function(err, review){
            foundCampground.reviews.push(review);
            foundCampground.save();
            res.redirect("/campgrounds/"+req.params.id);
        });
    });
});

app.listen(3000, function () {
    console.log("The YelpCamp Server has started at localhost:3000");
});