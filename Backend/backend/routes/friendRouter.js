const express = require('express')
const bodyParser = require('body-parser')
const friendRouter = express.Router()
friendRouter.use(bodyParser.json())
const cors = require('../routes/cors')
const Users = require('../models/user')
const authenticate = require('../authenticate')

friendRouter.route('/')
.options(cors.corsOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .populate('friend.user')
    .then((friends)=>{
        res.sendStatus=200
        res.setHeader('Content-Type','application/json')
        res.json(friends)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsOptions,authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .then((user)=>{
        if(user !=null){
        user.friend.push(req.body)
        user.save()
        .then((user)=>{
            Users.findById(req.user._id)
            .populate('friend.user')
            .then((user)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);
            },(err)=>next(err))
           
        })
    }
        else{
            err = new Error('User ' + req.user._id + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err)) 
    .catch((err)=>next(err));
})

friendRouter.route('/follow')
.options(cors.corsOptions,(req,res)=>{res.sendStatus=200;})
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Users.find({})
    .then((users)=>{
        console.log(req.user._id);
        var removeIndex = users.map(function(item) { return item._id; }).indexOf(req.user._id);
        users.splice(removeIndex-1, 1);
        console.log(users)
        Users.findById(req.user._id)
        .populate('friend.user')
        .then((user)=>{
            for(let u of user.friend){
                removeIndex = users.map(function(item) { return item._id; }).indexOf(u.user._id);
                users.splice(removeIndex-1, 1);
            }
            res.statusCode=200;
            res.setHeader('Content-Type','application/json')
            res.json(users)
        })
    },(err)=> next(err))
    .catch((err)=>next(err))
})
.post(cors.cors, authenticate.verifyUser,(req,res,next)=>{
    Users.findById(req.user._id)
    .then((user)=>{
        index = user.friend.map(function(item){return item.user;}).indexOf(req.body._id);
        user.friend.splice(index-1,1);
        user.save();
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(user)
    })
})

module.exports = friendRouter