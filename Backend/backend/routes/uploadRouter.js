const express = require('express')
var bodyParser = require('body-parser')
const authenticate = require('../authenticate')
const multer = require('multer')
const cors = require('./cors')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
var config = require('../config')
const url = config.mongoUrl;

const storage = new GridFsStorage({
    url : url,
    filename : (req,file,cb)=>{
        cb(null,file.originalName)
    }})

const imageFileFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/ )){
        return cb(new Error("You can upload only image files"),false);
    }
    cb(null,true);
}

const upload = multer({storage : storage, fileFilter:imageFileFilter})

const uploadRouter = express.Router()
uploadRouter.use(bodyParser.json())
 

uploadRouter.route('/')
.options(cors.corsOptions,(req,res)=>{res.sendStatus(200);})
.post(cors.cors,authenticate.verifyUser,upload.single('imageFile'),(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json')
    res.json(req);
})

module.exports = uploadRouter