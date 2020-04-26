var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/heroes_app", { useUnifiedTopology: true, useNewUrlParser: true });

var heroesSchema = new mongoose.Schema({
    name: String,
    hero_name: String, 
    gender: String,
    hero_team: String,
    power_level: Number
});

var Hero = mongoose.model("Hero", heroesSchema);

// var iron_man = new Hero({
//     name: "Reed Richards",
//     hero_name: "Mr. Fantastic",
//     gender: "Male",
//     hero_team: "Fantastic Four",
//     power_level: 1000000
// });

// iron_man.save(function(err, hero){
//     if(err){
//         console.log("Something Went Wrong..");
//     }
//     else{
//         console.log("We just saved a Hero to our Database..");
//         console.log(hero);
//     }
// });

// Hero.create({
//     name: "Wanda Maximoff",
//     hero_name: "Scarlet Witch",
//     gender: "Female",
//     hero_team: "X-Men/Avengers",
//     power_level: 500000
// }, function(err, hero){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(hero);
//     }
// });

Hero.find({}, function(err, heroes){
    if(err){
        console.log("Something Went Wrong");
        console.log(err);
    }else{
        console.log("All the Heroes..");
        console.log(heroes); 
    }

});