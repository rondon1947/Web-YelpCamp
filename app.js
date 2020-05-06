var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var Campground = require("./models/campground");
var Review = require("./models/review");
var User = require('./models/user');
var seedDB = require("./seeds");

var campgroundRoutes = require('./routes/campgrounds');
var reviewRoutes = require('./routes/reviews');
var indexRoutes = require('./routes/index');

mongoose.connect("mongodb://localhost:27017/yelpcamp", { useUnifiedTopology: true, useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.use(require("express-session")({
    secret: "Jai Shree Ram",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use(indexRoutes);

app.listen(3000, function () {
    console.log("The YelpCamp Server has started at localhost:3000");
});