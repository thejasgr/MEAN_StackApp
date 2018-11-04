var express = require('express');

var app = express();

var bodyParser = require('body-parser');




var urlencodedParser = bodyParser.urlencoded({ extended: false });




var jsonParser = bodyParser.json();




var db = null;

var mongodb = require('mongodb');

var mongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017";

const dbName = 'project'; //change

var resultArray = [];




function dbOperation(req, res, flagValue) {

mongoClient.connect(url, function (err, client) {

if (err) {

console.log('Unable to connect:' + err);

}

else {

console.log('Connected');

db = client.db(dbName);

if (flagValue == 'getPizza')

getPizza(res);

else if(flagValue == 'getIngridients')

getIngridients(res)

else if (flagValue == 'postDetails')

postDetails(req, res);

else if (flagValue == 'loginValidation')

loginValidation(req, res);

else if (flagValue == 'addCart')

addCart(req, res);

else if (flagValue == 'getCart')

getCart(req, res);

else if (flagValue == 'addTopping')

addTopping(req, res);

 

}

});




}




function loginValidation(req, res) {

if (db != null) {

db.collection('userdetails').find({ userID: req.body.userID
}).toArray(

function (err, result) {

if (err) {

console.log('error');

}

else {

if (req.body.userID == result.userID && req.body.password
== result.password) {

console.log('Successful Login')

res.end();

}

}

}

);

}

};







function getPizza(res) {

if (db != null) {

db.collection('pizza').find({}).toArray

(

function (err, result) {

if (err) {

console.log('error');

}

else {

console.log('data' + JSON.stringify(result));

res.send(JSON.stringify(result));

// res.send(result)

}

}

);

 

}

}




function getIngridients(res) {

if (db != null) {

db.collection('ingridients').find({}).toArray

(

function (err, result) {

if (err) {

console.log('error');

}

else {

console.log('data' + JSON.stringify(result));

res.send(JSON.stringify(result));

}

}

);

}

}







function postDetails(req, res) {

if (db != null) {

console.log("Reached");

console.log(req.body);




db.collection('userdetails').insertOne({ "userID": req.body.userID,
"password": req.body.password });

}

}




function addCart(req,res){

if(db != null){

db.collection("pizza").find({"id":req.body.id}).toArray(function(err,result){

if(err){

res.send(err);

}

else{

db.collection('cart').insertOne({

"id":result[0].id,

"type":result[0].type,

"price":result[0].price,

"name":result[0].name,

"image":result[0].image,

"description":result[0].description,

"ingredients":result[0].ingredients,

"topping":result[0].topping.sort(1),

"quant":1

});

console.log('inserted in menu');

msg = { status: true, msg: "Registered" }

res.send(msg)

 

} 

})




}

}




function getCart(req,res){

console.log('connected cart data');

 

if (db != null) {

db.collection('cart').find({}).toArray

(

function (err, result) {

if (err) {

console.log('error');

}

else {

console.log('data' + JSON.stringify(result));

res.send(JSON.stringify(result));

}

}

);

}

}




function addTopping(req,res){

if(db != null){

var x = parseInt(req.body.id);

db.collection("pizza").find({"id":x}).toArray(function(err,result){

if(err){

res.send(err);

}

else{

console.log("working");

console.log(typeof(req.body.id));

console

db.collection('cart').insertOne({

"id":result[0].id,

"type":result[0].type,

"price":result[0].price,

"name":result[0].name,

"image":result[0].image,

"description":result[0].description,

"ingredients":result[0].ingredients,

"topping":result[0].topping.sort(1),

"quant":1,

"addon":req.body.topping

});

console.log('inserted in menu');

msg = { status: true, msg: "Registered" }

res.send(msg)

 

} 

})




}




}







// app.use(function (req, res, next) {

// res.header('Access-Control-Allow-Origin', '*');

// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

// res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Content-Length,X-Requested-With');

// next();

// });

 

app.use(jsonParser);







app.use(function (req, res, next) {

res.header("Access-Control-Allow-Origin", "*");

res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

next();

});







app.get('/getPizza', function (req, res) {

console.log("getPizza called")

dbOperation(req, res, 'getPizza');

});







app.get('/getIngridients', function (req, res) {

dbOperation(req, res, 'getIngridients');

});




app.post('/postDetails', jsonParser, function (req, res)
{

 

console.log('userID:' + req.body.userID);

console.log('password:' + req.body.password);

msg = { status: true, msg: "Registered" }

dbOperation(req, res, 'postDetails');

res.send(msg);




});




app.post('/LoginValidation', function (req, res) {

dbOperation(req, res, 'LoginValidation');

});




app.get('/', function (req, res) {

msg = { status: true, msg: "Details obtained" };

res.send(msg);

});




app.post('/addCart',jsonParser,function(req,res){

dbOperation(req,res,"addCart");

 

})




app.get('/getCart',function(req,res){

dbOperation(req,res,"getCart");

 

});




app.post('/addTopping',jsonParser,function(req,res){

dbOperation(req,res,"addTopping");

 

});
















app.listen(4000, () => {

console.log("Server listening on port 4000");

});