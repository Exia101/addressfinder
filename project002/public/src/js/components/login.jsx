var React = require('react');
var Link = require('react-router').Link;
var AppStore = require("../stores/appStore.js");
var Dispatcher = require("../dispatchers/appDispatcher.js");
var browserHistory = require("react-router").browserHistory;

var Login = React.createClass({

  getInitialState : function(){
    return {
      username : '',
      password : '',
      loggedIn : AppStore.getToken(),
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

  onClickLogin : function(e){
    Dispatcher.dispatch({
          data : {
            username : this.state.username,
            password : this.state.password
          },
          action : 'login'
        })

        AppStore.on("login", function() {
          this.setState({
            status: true
          })
          localStorage.setItem("loggedIn", true);
          browserHistory.push("/homepage");
        }.bind(this))
  },

  render: function(){
    return(
      <div className="pic">
      <div className="header container z-depth-5">
        <h1>Login</h1>
      </div>
      <br />
      <br />
      <div className="form container">
        Username: <input type="text" onChange={this.getUsernameData} required={true} /><br />
        Password: <input type="password" onChange={this.getPasswordData} required={true} /><br />
        <button type="submit" onClick={this.onClickLogin}>Submit</button>
        <button type="button"><Link className="white-text" to="/register">Register</Link></button>
      </div>
      </div>
    )

  }
})


module.exports = Login;
