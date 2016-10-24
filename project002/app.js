var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var User = require('./models/user.js');
var NodeGeocoder = require('node-geocoder');

mongoose.connect('mongodb://localhost/project002');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use('/', express.static(__dirname + '/public'));

app.get('/*', function(req, res) {
res.sendFile(__dirname + '/public/index.html');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

// Register routes
app.post('/register', function(req, res) {
  var newUser = new User({
        username : req.body.username,
        password : req.body.password
          });

      User.createUser(newUser,function(err,user){
        if(err) throw err;
        console.log(user);
      });

      res.status(200).send('ok');
})


// Login routes
app.post('/login',function(req,res){
  console.log(req.body);
  User.getUserByUsername(req.body.data.username, function(err, user){
         if(err) throw err;
         if(!user){
           return res.status(404).send({"message": "no user"})
         }else{

      User.comparePassword(req.body.data.password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    res.status(200).send('LOGIN');
                    return true;
                } else {
                    res.status(403).send('NOTLOGIIN');
                    return false;
                }
             });
        }
    })
});

// Geolocation
var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyB5rkFbWBDA71KkFMCwiPvES7IDu6Zwoqk', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

app.post('/post', function(req, res){
  geocoder.geocode(req.body.data.address, function(err, resp) {
    res.send({
      latitude: resp[0].latitude,
      longitude: resp[0].longitude
    });
  });
});

app.listen(3000, function(){
  console.log('listening on port 3000');
});
