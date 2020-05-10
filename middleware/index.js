var Campground = require("../models/campground");
var Review = require("../models/review");

var middlewareCollection = {};

middlewareCollection.isCampgroundOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, foundCampground){
            if(err){
                res.redirect("back");
            } else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("back");
    }
};

middlewareCollection.isReviewOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Review.findById(req.params.review_id, function (err, foundReview){
            if(err){
                res.redirect("back");
            } else{
                if(foundReview.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("back");
    }
};

middlewareCollection.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareCollection;