const express = require('express')
var bodyParser = require('body-parser')
const authenticate = require('../authenticate')
const multer = require('multer')
const cors = require('./cors')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
var config = require('../config')
const url = config.mongoUrl;
const download = require('../routes/download')
const fileDownload  = require('../routes/filedownload')
const mongoose = require('mongoose')
const Users = require('../models/user')
var db = mongoose.connection.useDb() 

const storage = new GridFsStorage({
    url : url,
    file : (req,file)=>{
        return {
            bucketName : req.user._id
            
        }
    }})

const imageFileFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/ )){
        return cb(new Error("You can upload only image files"),false);
    }
    cb(null,true);
}

const upload = multer({storage : storage, fileFilter:imageFileFilter})

const uploadRouter = express.Router()
uploadRouter.use(bodyParser.json({limit : '50mb'}))
uploadRouter.use(bodyParser.urlencoded({limit : '50mb',extended:true}))
 

uploadRouter.route('/')
.options(cors.corsOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    
     db.collection(req.user._id+'.files').find()
    .toArray(function(err,files){
        res.sendStatus = 200;
        res.setHeader('Content-Type','application/json')
        res.json(files);    
    })

})
.post(cors.cors,authenticate.verifyUser,upload.single('imageFile'),(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json')
    res.json({"success" : "true"});

})

uploadRouter.route('/view')
.options(cors.corsOptions,(req,res)=>{res.sendStatus(200);})
.post(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    download.getFile(req,res);
})


uploadRouter.route('/followers_view')
.options(cors.corsOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    arr=[]
    Users.findById(req.user._id)
    .populate('friend.user')
    .then((friends)=>{
        for(let f of friends.friend){
            let a = {}
            a['user'] = f.user._id 
            db.collection(f.user._id+'.files').find()
            .toArray(function(err,files){
                a['files'] = files
                arr.push(a)
                console.log(arr)
                if(arr.length==friends.friend.length){
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(arr);        
                }
            }) 
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})
module.exports = uploadRouter