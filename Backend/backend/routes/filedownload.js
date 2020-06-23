var mongoose = require('mongoose');
var db = mongoose.connection.useDb()
var data = []
module.exports.getFile = (filename,_id,callback)=> {  
    //Accepting user input directly is very insecure and should      
    //never be allowed in a production app.  
    //Sanitize the input before accepting it  
    //This is for demonstration purposes only  
    //console.log(filename)
    //let dat = []
    let fileName = filename;  
    //Connect to the MongoDB client
const collection = db.collection(_id+'.files');    
const collectionChunks = db.collection(_id+'.chunks');
  collection.find({filename: fileName}).toArray(function(err, docs){        
    //console.log(docs) 
    if(err){        
        console.log(err)
            
      }
    if(!docs || docs.length === 0){        
      console.log("Does not exist")      
     }else{
        
     //Retrieving the chunks from the db          
       collectionChunks.find({files_id : docs[0]._id})
       .sort({n: 1}).toArray(function(err, chunks){          
         if(err){            
            return res.render('index', {
             title: 'Download Error', 
             message: 'Error retrieving chunks', 
             error: err.errmsg});          
          }
        if(!chunks || chunks.length === 0){            
          //No data found            
          return res.render('index', {
             title: 'Download Error', 
             message: 'No data found'});          
        }
      //console.log(chunks)
      let fileData = [];
      let v = 1          
      for(let i=0; i<chunks.length;i++){            
        //This is in Binary JSON or BSON format, which is stored               
        //in fileData array in base64 endocoded string format               
       
        fileData.push(chunks[i].data.toString('base64'));          
      }
      //console.log(docs[0].contentType)
       //Display the chunks using the data URI format          
       let finalFile = 'data:' + docs[0].contentType + ';base64,'+ fileData.join('');     
       // console.log(finalFile)     
        // res.render('imageView', {
        //    title: 'Image File', 
        //    message: 'Image loaded from MongoDB GridFS', 
        //    imgurl: finalFile});
         data= {
            "filename" : filename,
            "imgurl" : finalFile
        
        }
        callback && callback(data)
        //console.log(data.length);
        });
       //console.log(data.length);
 
      }
      //callback && callback(data)
     });
     
  };

