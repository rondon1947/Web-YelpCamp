var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

router.get("/", function (req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            res.render("landing");
        } else{
            res.render("campgrounds/index", {campgroundsData: allCampgrounds, currentUser: req.user});
        }
    });
});

router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author};
    Campground.create(newCampground, function(err, newlyCreatedGround){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("reviews").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

router.get("/:id/edit", isOwner, function (req, res){
    Campground.findById(req.params.id, function (err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

router.put("/:id/update", isOwner, function (req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground){
        res.redirect("/campgrounds/"+req.params.id)
    });
});

router.delete("/:id", isOwner, function (req, res){
    Campground.findByIdAndDelete(req.params.id, function (err){
        res.redirect("/campgrounds");
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function isOwner(req, res, next){
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
}

module.exports = router;