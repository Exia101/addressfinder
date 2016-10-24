var React = require("react");
var ReactDOM = require("react-dom");
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var Login = require('./components/login.jsx');
var Register = require('./components/register.jsx');
var Homepage = require('./components/homepage.jsx');
var browserHistory = require('react-router/lib/browserHistory');
var Map = require('./components/map.jsx');
var GoogleMaps = require('google-map-react');
var AppStore = require('./stores/appStore.js');
require('../css/style.css');



var App = React.createClass({
  componentDidMount: function() {
    if (AppStore.getToken()) browserHistory.push("/homepage");
  },

  render: function(){
    return(
      <Router history={browserHistory}>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/homepage" component={Homepage} />
      </Router>
    )
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
