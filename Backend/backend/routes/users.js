var express = require('express');
var router = express.Router();
var User = require('../models/user')
var mongoose = require('mongoose')
var passport = require('passport')
const cors = require('./cors');
var authenticate = require('../authenticate')
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({})
  .then((users)=>{
    res.sendStatus = 200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  },(err)=>next(err))
  .catch((err)=>next(err));
});


router.post('/signup',cors.corsOptions,(req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
         
        });
      });
    }
  });
});

router.post('/login',cors.corsOptions,passport.authenticate('local'),(req,res)=>{
  var token = authenticate.getToken({_id : req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json({success : true,token : token,status: 'You are successfully logged in'});  
})


module.exports = router;