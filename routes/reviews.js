var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Review = require('../models/review');
var middlewareCollection = require("../middleware/index");

router.get("/new", middlewareCollection.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("reviews/new", {campground: foundCampground});
    });
});

router.post("/", middlewareCollection.isLoggedIn, function (req, res){
    Campground.findById(req.params.id, function (err, foundCampground) {
        Review.create(req.body.review, function(err, review){
            review.author.id = req.user._id;
            review.author.username = req.user.username;
            review.save();
            foundCampground.reviews.push(review);
            foundCampground.save();
            res.redirect("/campgrounds/"+foundCampground._id);
        });
    });
});

router.get("/:review_id/edit", middlewareCollection.isReviewOwner, function (req, res){
    Review.findById(req.params.review_id, function (err, foundReview){
        if(err){
            res.redirect("back");
        } else{
            res.render("reviews/edit", {campground_id: req.params.id, review: foundReview});
        };
    });
});

router.put("/:review_id/update", middlewareCollection.isReviewOwner, function (req, res){
    Review.findByIdAndUpdate(req.params.review_id, req.body.review, function (err, updatedReview){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:review_id/delete", middlewareCollection.isReviewOwner, function (req, res){
    Review.findByIdAndDelete(req.params.review_id, function (err){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

module.exports = router;