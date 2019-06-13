const express = require('express');
require('dotenv').config();
request = require('request');
const app = express();
const bodyParser = require('body-parser');
var wget=require('node-wget');
var url = require('url');
var path = require('path');
const ipfsAPI = require('ipfs-api');
const fs = require('fs');

const ipfs = ipfsAPI('127.0.0.1', '5001', {protocol: 'http'})

var youtubedl = require('youtube-dl');

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/ping", function(req, res){
  res.json({ messaage: "pong" });
});

app.post("/api/getToken", function(req, res){


var DEFACCOUNT = '0x71';
var accounts = ['0x17', '0x12', '0x17', '0x07'];
var numbers = [65, 44, 12, 4];
var newarray = numbers.map(myFunction)


//createToken(65);
createToken(69,numbers, accounts, DEFACCOUNT);
newarray = numbers.map(myFunction)

function myFunction(num) {
  return accounts[numbers.indexOf(num)]
}

function createToken(myId, numbers, accounts, DEFACCOUNT) {
   if (!numbers.includes(myId)) {
       console.log(myId)
       //numbers.push(myId);
       accounts.push(DEFACCOUNT);
      //numbers[DEFACCOUNT] = myId;
      numbers.push(myId)
   }
}
});

app.post("/api/getAccount", function(req, res){


var DEFACCOUNT = '0x71';
var accounts = ['0x17', '0x12', '0x17', '0x07'];
var numbers = [65, 44, 12, 4];
var newarray = numbers.map(myFunction)


//createToken(65);
createToken(69,numbers, accounts, DEFACCOUNT);
newarray = numbers.map(myFunction)

function myFunction(num) {
  return accounts[numbers.indexOf(num)]
}

function createToken(myId, numbers, accounts, DEFACCOUNT) {
   if (!numbers.includes(myId)) {
       console.log(myId)
       //numbers.push(myId);
       accounts.push(DEFACCOUNT);
      //numbers[DEFACCOUNT] = myId;
      numbers.push(myId)
   }
}
});

app.post("/api/mint", function(req, res){


var DEFACCOUNT = '0x71';
var accounts = ['0x17', '0x12', '0x17', '0x07'];
var numbers = [65, 44, 12, 4];
var newarray = numbers.map(myFunction)


//createToken(65);
createToken(69,numbers, accounts, DEFACCOUNT);
newarray = numbers.map(myFunction)

function myFunction(num) {
  return accounts[numbers.indexOf(num)]
}
  
function createToken(myId, numbers, accounts, DEFACCOUNT) {
   if (!numbers.includes(myId)) {
       console.log(myId)
       //numbers.push(myId);
       accounts.push(DEFACCOUNT);
      //numbers[DEFACCOUNT] = myId;
      numbers.push(myId)
   }
}
});


app.post("/api/saveipfsimageurl1", function(req, res){
    var imageurl = req.body.imageurl;
console.log("image url " + imageurl);
    wget(imageurl); // saves image
    var parsed=url.parse(imageurl);
	var ytid = imageurl.substring(imageurl.search("v=")+2);
	console.log(ytid);
	
	
	console.log(path.basename(parsed.pathname));
    res.json({ message: "Correct",  imagename:ytid});
    //Reading file from computer

});

app.post("/api/saveipfsimageurl", function(req, res){
    var imageurl = req.body.imageurl;
console.log("image url " + imageurl);


var video = youtubedl(imageurl,
  // Optional arguments passed to youtube-dl.
  ['--format=18'],
  // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname });
 
// Will be called when the download starts.
video.on('info', function(info) {
  console.log('Download started');
  console.log('filename: ' + info._filename);
  console.log('size: ' + info.size);
});
var imagename = imageurl.substring(imageurl.search("v=")+2);
console.log(imagename) 
video.pipe(fs.createWriteStream(imagename));
 res.json({ message: "Correct",  imagename:imagename});

});



app.post("/api/saveipfsimage", function(req, res){
  var imagename =  req.body.imagename;

//var imagename = req.body.imagename;
//var imagename="./hse.jpeg"
console.log(imagename);
  //Reading file from computer
  let testFile = fs.readFileSync(imagename);
  //Creating buffer for ipfs function to add file to the system
  let testBuffer = new Buffer(testFile);
      ipfs.files.add(testBuffer, function (err, file) {
          if (err) {
		  console.log("error"+err);
          //  res.json({ message: "error",  ipfshash: ''});

          }
	      console.log(file);
        //  res.json({ message: "Correct",  ipfshash: file});

        })
});
	
	app.use(express.static(__dirname + "/public" ));

app.listen(3001, function(){
  console.log("App starts at port :" +3001);
});;
