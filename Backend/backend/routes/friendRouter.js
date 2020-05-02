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
    Users.findById(req.user._id)
    .populate('friend.user')
    .then((user)=>{
        var arr = [];
        console.log(user.friend)
        for(let a of user.friend){
            console.log(a.user)
            arr.push(a.user._id)
        }
        Users.find({
            $and : [
                {
                    "_id" : {
                        $ne : req.user._id
                    }
                },{
                    "_id" : {
                        $nin : arr
                    }
                }
            ]
         }) 
        .then((users)=>{
           
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
        user.friend.id(req.body._id).remove()
        user.save()
        .then((user)=>{
            Users.findById(user._id)
            .populate("friend.user")
            .then((user)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json')
                res.json(user)
            })
        })
      
    })
})

module.exports = friendRouter