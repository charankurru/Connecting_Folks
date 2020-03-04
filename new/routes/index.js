var express = require("express");
var router = express.Router();
var monk = require("monk");
var db = monk("localhost:27017/aditya");
var images = db.get("images");
var multer = require("multer");
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const  Tesseract  = require('tesseract.js');

var upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function(req, res, next) {
    images.find({}, function(err, docs) {
        res.render("index", { data: docs });
    });
});


var photo = fs.readFileSync(__dirname + '/images/reco1.png',{encoding:null});

router.post("/profile", upload.single("avatar"), function(req, res, next) {
    images.insert({name:req.file.originalname},function(err, docs) {
        if(err){
            console.log(err);
        }
        else{
             Tesseract.recognize(photo)
             .progress(function(p){
                 console.log('progress',p);
             })
             .then(function(result){
                 console.log(result);
             });
    res.redirect("/"); // req.body will hold the text fields, if there were any
        }
    });
});

module.exports = router;
