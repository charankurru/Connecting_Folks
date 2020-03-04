var express = require('express');
var router = express.Router();
var monk = require('monk');   /*used for linking the database i.e  mongodb to exprees(middleware) */
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var db = monk('localhost:27017/users'); /*we are creating a database with name users. here 27017 is default mongodb port */
var collection = db.get('logindetails');
 var posdet = db.get('projdetails');                                    /* we created a collection in the database named logindetails */
/* GET home page. */
router.get('/', function(req, res, next) {
    posdet.find({},function(err,docs){
            	if(err)
		{
			console.log(err);
		}
		else { 
			console.log(docs);
			res.render('newhome',{"store":docs})
		}
            });
});
router.post('/form',function(req,res,next) {
	collection.insert(req.body,function(err,docs){
		if(err)
		{
			console.log("err");
		}
		else {
			console.log(docs);
			res.redirect('/table');
		}

       });
});
      router.get('/table', function(req, res, next){
            collection.find({},function(err,docs){
            	if(err)
		{
			console.log(err);
		}
		else { 
			console.log(docs);
			res.render('table',{"data":docs})
		}
            });
});
    router.get('/home',function(req,res,next){
         res.redirect('home');
        
    });

router.get('/charan',function(req,res,next){
         res.render('home');
        
    });

router.get('/sunil',function(req,res,next){
         res.render('home');
        
    });
      router.post('/formal',function(req,res){
      	var uname = req.body.Username;
      	var pws = req.body.password;
      	collection.findOne({"Username":uname,"password":pws},function(err,docs){
      		if(!docs)
      		{
      			res.render('home',{error:"invalid credentials"});
      		}
      		else if(docs)
      		{
                 delete docs.password
                req.session.usable=docs;
                console.log(req.session.usable);
                  res.redirect('/mine');
      		}
      		else
      		{
      			console.log(err);
      		}
      	});
    });	
     router.get('/mine',function(req,res){
         if(req.session && req.session.usable){
             res.locals.usable=req.session.usable
             res.render('mine');
         }
         else{
             req.session.reset();
             res.redirect('/home')
         }
     }); 
      router.post('/remove',function(req,res){
     	var uname = req.body.a;
     	collection.remove({"Username":uname},function(err,docs,next){
     		res.send(docs)
     	});
     });
     /* router.post('/update',function(req,res){
      	var item = {
      		lastname = req.body.lastname,
      		Email  = req.body.Email,
      		password = req.body.password
      	};
     	var id = req.body.Username;
     	collection.updateOne({"Username":ObjectId(id)}, {$set: item} ,function(err,docs,next){
     		if(err)
     		{
     			console.log(err);
     		}
     		else(docs)
     		{
     			console.log(docs);
     		}
 
     	});
     });*/
     router.post('/edit',function(req,res){
		  var id=req.body.b;
		  collection.find({"Username":id},function(err,docs){
		  res.send(docs);
		  });
 });
     router.post('/update',function(req,res){
		    var a=req.body.id;
		    collection.update({"_id":a},{$set:req.body},function(err,docs){
		        res.redirect('/table');
		    });
});
     router.post('/sendmail',function(req,res){
         console.log(req.body.email)
     });
     router.get('/forgot',function(req,res){
          res.render('forgot');
     });
     
     router.post('/updating',function(req,res){
         collection.insert(req.body,function(err,docs) {});
         console.log(req.body.Username);
         res.redirect('/home');
     });
     router.get('/projects',function(req,res){
    res.render('projects')
         });
router.post('/postproj',function(req,res,next){
    posdet.insert(req.body,function(err,docs){
		if(err)
		{
			console.log("err");
		}
		else {
			console.log(docs);
			res.redirect('/projects');
		}

       });
});
module.exports = router;
