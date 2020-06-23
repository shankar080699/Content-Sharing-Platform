const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const feedSchema = new Schema({
    file : {
        type : String,
        default : ''
    }
}); 
const friendSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});
const User = new Schema({
   // using session
    /* username : {
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },*/
    firstname : {
        type : String,
        default : ''
    },
    lastname : {
        type : String,
        default : ''
    },
    
    admin :{
        type : Boolean,
        default : false
    },
    friend : [friendSchema],
    feed : [feedSchema]
})

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);