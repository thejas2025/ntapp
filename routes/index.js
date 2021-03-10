var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Thejas' });
});

router.get('/hi', function(req, res, next){
  res.render('hi',{textToPage : 'Hi o the world'});
})

router.get('/ulist', function(req, res){
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e, docs){
    res.render('userlist',{
      'userlist' : docs
    });
  });
});


router.get('/nuser', function(req, res){
  res.render('newuser',{title : 'Add new user'});
});


router.post('/adduser', function(req, res){
  var db = req.db;

  var nameFromForm = req.body.username;
  var emailFromForm = req.body.useremail;

  var newUser = { "username" : nameFromForm, "email" : emailFromForm};
  var collection = db.get('usercollection');
  collection.insert(newUser, function(err, doc){
    if (err) {
      res.send("There was some error inserting info the DB ", err);
    }
    else {
      res.redirect('ulist');
    }
  });
});




module.exports = router;
