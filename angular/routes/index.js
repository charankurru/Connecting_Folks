var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/users')
var user = db.get("users");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('intro', { title: 'Express' });
});
/* FOR Posting data to backend.*/
router.post('/postdata',function(req,res){
   console.log(req.body);
    user.insert(req.body,function(err,docs){
        console.log(docs);
    })
});
/* for getting the data from backend to for end */
router.get('/getdata',function(req,res){
    user.find({},function(err,docs){
        res.send(docs)
    });
});
router.post('/edit',function(req,res){x
    console.log(req.body);
    call.update({"_id":req.body._id},{$set:req.body},function(err,docs){
        res.send(docs);
    });
});
module.exports = router;