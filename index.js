const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { reset } = require('nodemon');
require('dotenv').config();
var mysql = require('mysql');
const { read } = require('fs');
const app = express();
const port = 3000;


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:'hoteltraveltourism'
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("MySql db Connected!");
  });

  app.get('/fetch-host', function (req,res,next){//to get all host in db
   
    var sql=`SELECT * FROM host`;
    con.query(sql,function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
  });
  app.get('/fetch-users', function (req,res,next){//to get all user in db
   
    var sql=`SELECT * FROM user`;
    con.query(sql,function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
  });
  


   app.get('/fetch-houses', function (req,res,next){//to get all houses in db
    var sql=`SELECT * FROM host,houses where houses.house_id=host.host_id`;
    con.query(sql,function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
  });
 
  app.get('/fetch-images/:house_id', function (req,res,next){//to get all images by houseid in db
    var {house_id}=req.params;
    var sql=`SELECT * FROM images where house_id= ?`;
    con.query(sql,[house_id],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
  });

  app.get('/fetch-reviews', function (req,res,next){//to get all reviews in db
    var sql=`SELECT * FROM reviews `;
    //,houses where reviews.reviewId=houses.house_id;
    con.query(sql,function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
  });

  app.get('/fetch-calendar/:house_id', function (req,res,next){//to get all calendar by house in db
    var {house_id}=req.params;
    var sql=`SELECT * FROM calendar where house_id=? `;
    con.query(sql,[house_id],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
  });
  app.get('/fetch-user/:userId', function (req,res,next){//To fetch the calendar by user in db
    var {userId}=req.params;
    var sql=`SELECT * FROM calendar where userId=?`;
    con.query(sql,[userId],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
  });
 
  app.post('/calendar/insert/', (req, res) => { 
    let {guest} =req.body;
    guest=JSON.stringify(guest);
    delete req.body.guest;
    let object=({...req.body,guest});
    //console.log(object);
     con.query("insert into calendar set ?",[(object)],(error,data)=>{
      if(error){
       console.log(error);
         res.status(404).send({message:'error'})
         return;
       }
       res.status(200).send({message:'success'})
     console.log(object);
     });

  
       });

       app.post('/nofication/insert', (req, res) => { 
        let {type} =req.body;
      type=JSON.stringify(type);
        delete req.body.type;
        let object=({...req.body,type});
         con.query("insert into nofication set ?",[(object)],(error,data)=>{
          if(error){
           console.log(error);
             res.status(404).send({message:'error'})
             return;
           }
           res.status(200).send({message:'success'})
         console.log(object);
         });
    
         });

         app.get('/nofication/',(req,res)=>{
           console.log("please rate your stay in the house"); 

           const date1 = new Date("4/13/2022");
           const date2 = new Date("4/20/2022");

         var sql ="select * from nofication"
          con.query(sql,function (err,diffInMs,data){
              if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            console.log(getDifferenceInDays(date1, date2));
           function getDifferenceInDays(date1, date2) {
            const diffInMs = Math.abs(date2 - date1);
            return diffInMs / (1000 * 60 * 60 * 24);
           }
            res.send({status:200, message:'success',diffInMs});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        
        });
      
         });


         app.get('/fetch-house/:host_id', function (req,res,next){//to get all images by houseid in db
          var {host_id}=req.params;
          var sql=`SELECT * FROM houses where host_id= ?`;
          con.query(sql,[host_id],function (err,data){
              if(err) {
                  console.log(err)
                  return;
                };
                if (data.length > 0) {
                  res.send({status:200, message:'success',data});    
                } else {    
                  res.send({status:404, message:'failed'});
                }
              });
        });
      




     


    
    app.listen(port, () => console.log(`Hello safi app listening on port ${port}!`));









      /*CREATE TABLE `ads` (
  `id` int(60) NOT NULL,
  `ads_type` varchar(10) NOT NULL,
  `placement` varchar(20) NOT NULL,
  `placement_category` varchar(20) NOT NULL,
  `ads_title` text NOT NULL,
  `advertiser` varchar(20) NOT NULL,
  `advertiser_details` text NOT NULL,
  `links` text NOT NULL,
  `ads_image` text NOT NULL,
  `status` int(1) NOT NULL
)  
*/
/*var sql2 = "CREATE TABLE  Nofication" +
       " (Id INT not null AUTO_INCREMENT, " +
        " content Text, " +
        " type varchar (255), " +
             " PRIMARY KEY (Id) )";
    con.query(sql2, function(err, results) {
        if (err) throw err;
        console.log("Table nofication created");
    });*/


     /*var sql2="CREATE TABLE host"+
  "(id INT not null AUTO_INCREMENT,"+
    " name VARCHAR (255),"+
     " profile_pic text NOT NULL,"+
      " PRIMARY KEY (id) )";
  con.query(sql2, function(err, results) {
          if (err) throw err;
          console.log("Table  created");
      });*/


      /*var sql2="CREATE TABLE User"+
"(userId INT not null AUTO_INCREMENT,"+
" name varchar (255),"+
 " PRIMARY KEY (userId) )";
  con.query(sql2, function(err, results) {
          if (err) throw err;
          console.log("Table  created");
      });*/

      /*var sql2 ="CREATE TABLE houses"+
  "(house_id INT not null AUTO_INCREMENT,"+
    "title text NOT NULL,"+
     "room varchar (255),"+
     "picture text NOT NULL,"+
     "facilities varchar(255),"+
     "coordinates varchar(255),"+
      "address varchar (255),"+
      "host varchar (255),"+
      "status int(1) NOT NULL,"+
      "type varchar (255),"+
      "basic_price integer (25),"+
       "listing_type varchar (255),"+
         "maintenance_fee integer(40),"+  
          "content text NOT NULL,"+
           " PRIMARY KEY (house_id) )";
      con.query(sql2, function(err, results) {
          if (err) throw err;
          console.log("Table created");
      });*/
/* 
  var sql2 ="CREATE TABLE IMAGES" +
 " (imageId INT not null AUTO_INCREMENT, " +
    "link text not NULL,"+
    "type varchar (255),"+
     "link_to varchar (255),"+
     "house_id INT not NULL,"+
     "status int(1) not NULL,"+
    " PRIMARY KEY (imageId) )";
    con.query(sql2, function(err, results) {
        if (err) throw err;
        console.log("Table created");
    });*/


     /* var sql2="CREATE TABLE calendar"+
"(calendarId INT not null AUTO_INCREMENT,"+
"house_id INT not NULl,"+
"date_from DATE ,"+
"date_to DATE ,"+
"reservation_type varchar (255),"+
"amount integer ,"+
"guest varchar (255),"+
"payment_status integer ,"+
"payment_mode varchar (255),"+
          " PRIMARY KEY (calendarId) )";
    con.query(sql2, function(err, results) {
        if (err) throw err;
        console.log("Table created");
    });*/


    /*app.post('/house/insert/', (req, res) => { //insert houses with the following properties
 
  let {room,facilities}=req.body;
   room =[{1:"single"},{2:"double"}]
 facilities=["swimming","sport"]
room=JSON.stringify(room);
facilities=JSON.stringify(facilities);
delete req.body.room;
delete req.body.facilities;
let object=({...req.body,room,facilities});
   con.query("insert into houses set ?",[(object)],(error,data)=>{
    if(error){
     console.log(error);
       res.status(404).send({message:'error'})
       return;
     }
     res.status(200).send({message:'success'})
   
   });
  
   });*/


   /*var sql2 = "CREATE TABLE  Nofication" +
       " (Id INT not null AUTO_INCREMENT, " +
        " content Text, " +
        " type varchar (255), " +
             " PRIMARY KEY (Id) )";
    con.query(sql2, function(err, results) {
        if (err) throw err;
        console.log("Table nofication created");
    });*/
