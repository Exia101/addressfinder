var React = require('react');
var Link = require('react-router').Link;
var AppStore = require('../stores/appStore.js');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Dispatcher = require('../dispatchers/appDispatcher.js');
var IndexRouter = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var browserHistory = require('react-router').browserHistory;

var Register = React.createClass({

  getInitialState : function(){
    return {
      username: '',
      password: '',
      status: ''

    }
  },

  getUsernameData : function(e){
  this.setState({
    username : e.target.value
  });
  },
  getPasswordData : function(e){
  this.setState({
    password : e.target.value
  });
  },
  onClickRegister : function(e){
    console.log("click");
    Dispatcher.dispatch({
          data : {
            username : this.state.username,
            password : this.state.password
          },
          action : 'register'
        })

        AppStore.on("register", function() {
          console.log("register emitting")
                  this.setState({
                    status: true
                  })
                }.bind(this))

        e.preventDefault();
  },

  render: function(){
    return(
      <div>
        <div className="header container z-depth-5">
          <h1>Register</h1>
        </div>
        <br />
        <br />
        <div className="form container">
          Username: <input type="text" name="username" onChange={this.getUsernameData}/><br />
          Password: <input type="password" name="password" onChange={this.getPasswordData}/><br />
          <button type="submit" onClick={this.onClickRegister}>Register</button>
          <button type="button"><Link className="white-text" to="/login">Login</Link></button>
        </div>
      </div>
    )
  }



})


module.exports = Register;
