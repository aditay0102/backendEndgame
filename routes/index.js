var express = require('express');
var router = express.Router();
const userModel = require("./users");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/create', async function(req,res){
  let userdata =  await userModel.create({
    username: "angelpriya",
  nickname:  "angel",
  description: "fake girl who llike to play with boys feelings",
  categories: ['timepass','bf1','bf2'],
  })
  res.send(userdata);
})

router.get("/find",async function(req,res){
  let user = await userModel.find({username: "aditya"});
  res.send(user);
})

/// RegExp is used for seaarching case insensitive result 
// ^ = starting
// $ = ending
router.get("/regfind",async function(req,res){
   var regex = new RegExp("^aditya$","i");
   let user = await userModel.find({username: regex});
   res.send(user);
})

router.get("/arrayfind",async function(req,res){
  let user = await userModel.find({categories: {$all: ['bf1']}});
  res.send(user);  
})

router.get("/findDate",async function(req,res){
  var date1 = new Date('2023-11-02');
  var date2 = new Date('2023-11-03');
  let user = await userModel.find({datecreated: {$gte: date1, $lte: date2}});
  res.send(user);
})

// for searching a field  
router.get("/getfield",async function(req,res){
  let user = await userModel.find({categories: {$exists: true}});
})

module.exports = router;
