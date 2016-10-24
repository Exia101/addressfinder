var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatchers/appDispatcher.js');
var merge = require('merge');
var axios = require('axios');
var Login = require('../components/login.jsx');
var Register = require('../components/register.jsx');
var React = require('react');
var register = false;

var _google = {};

var AppStore = merge(EventEmitter.prototype, {

  getRegister: function(){
    return register;
  },

  getLogin: function(){
    return login;
  },
  getToken: function() {
    if (localStorage.getItem("loggedIn")) {
      return true;
    } else {
      return false;
    }
  },

 // Google Maps
 // getCount: function() {
 //   console.log("getting count");
 //   return _count;
 // },
 getGoogle: function() {
   axios.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyA86swi7AyXp8WHQlQvTeOMpAAcA1ihrWI", {
   })
       .then(function(response) {
         _google = response;
         console.log(response);
         AppStore.emit("google");
       })
       .catch(function(error) {
         console.log("ERROR: " + error);
       })
 },

 getPlace: function() {
   console.log("getting dummy data");
   return _place;
 }
})

module.exports = AppStore;

Dispatcher.register(handleAction);
function handleAction(payload){
  var self = this;

  if(payload.action === 'login'){
    console.log(payload);
    axios.post('http://localhost:3000/login', {
      data: {
        username: payload.data.username,
        password: payload.data.password
      }
    })
    .then(function (response) {
        console.log(response);
        if(response.data === 'LOGIN'){
           AppStore.emit("login");
           console.log('user is logied in sucess');
         }

        })
        .catch(function (error) {
          console.log(error);
        });
  } else if(payload.action === 'register'){
        axios.post('http://localhost:3000/register', {
          username: payload.data.username,
          password: payload.data.password
        })
        .then(function (response) {
          AppStore.emit("register");
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
  }
}
