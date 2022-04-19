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


         
 app.get('/nofication/:nofId',(req,res)=>{//to get notification from db using 
          var {nofId}=req.params;
          var sql=`SELECT * FROM nofication where nofId= ?`;
          con.query(sql,[nofId],function (err,data){
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






