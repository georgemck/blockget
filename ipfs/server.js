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

// simulate NFTs
var DEFACCOUNT = '1.2.737';
var numbers = [{nft:65,uri:"QmSJ4Jo7QeWWFB3XtEKXF6RZCbhUhKuFeniAd31Ywp5bbM"}, {nft:44,uri:"QmdggoorEinYU5waziF4Vy8tEuQV6ckpizDhannFT3io4T"}, {nft:12,uri:"QmepFThneps229xhMDVCmqk1C83t7iEEf59VJ5DeeZCK1N"},{ nft:4,uri:"QmT4tn6HXt8jnx3CyxQk2KrGJ9maqgP3jv2NJgWPnqsmBz"}];
var accounts = ['1.2.400','1.2.450','1.2.400','1.2.737'];

/*
// simulate NFTs
var DEFACCOUNT = '1.2.737';
var accounts = ['1.2.400', '1.2.450', '1.2.400', '1.2.300'];
var numbers = [65, 44, 12, 4];
*/







app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/ping", function(req, res){
  res.json({ messaage: "pong" });
});


app.post("/api/getAccount", function(req, res){
 var myNFT = parseInt(req.body.myNFT);
  console.log("ths ", myNFT);
  console.log(myNFT.nft)
  console.log(parseInt(myNFT.nft))
	var myaccount = accounts[numbers.indexOf(numbers.find(x => x.nft === myNFT))];
	var foundipfstext = numbers.find(x => x.nft === myNFT).uri;
//	var myaccount = accounts[numbers.indexOf(myNFT.nft)];

console.log("myaccount ",myaccount);
 res.json({ message: "Correct", myaccount: myaccount, foundipfstext: foundipfstext});
});

app.post("/api/mint", function(req, res){
// simulate tokens by global storage

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





app.post("/api/saveipfsvideourl", function(req, res){
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
