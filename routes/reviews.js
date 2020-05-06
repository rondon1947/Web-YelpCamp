var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Review = require('../models/review');

router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("reviews/new", {campground: foundCampground});
    });
});

router.post("/", isLoggedIn, function (req, res){
    Campground.findById(req.params.id, function (err, foundCampground) {
        Review.create(req.body.review, function(err, review){
            foundCampground.reviews.push(review);
            foundCampground.save();
            res.redirect("/campgrounds/"+req.params.id);
        });
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;